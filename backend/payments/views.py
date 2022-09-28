from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
import stripe

from orders.models import Order, OrderItem


stripe.api_key = settings.STRIPE_SECRET_KEY
webhook_endpoint_secret = settings.STRIPE_WEBHOOK_SECRET


class StripePaymentIntentView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            data = request.data
            order = Order.objects.get(id=data["order_id"])

            intent = stripe.PaymentIntent.create(
                amount=int(order.total_price * 100),
                currency="gbp",
                automatic_payment_methods={
                    "enabled": True,
                },
                metadata={"order_id": order.pk},
            )
            return Response(
                {"clientSecret": intent["client_secret"]}, status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_403_FORBIDDEN)


class StripeWebhookView(APIView):
    def update_payment_status(self, order):
        order.is_paid = True
        order.save()

    def update_delivery_status(self, order, order_items, sent_file_objs):
        if len(order_items) == len(sent_file_objs):
            order.is_delivered = True
            order.save()

    def send_order_confirm_email(self, order, order_items, user):
        context = {
            "first_name": user.first_name,
            "total_price": order.total_price,
            "subtotal_price": order.subtotal_price,
            "shipping_price": order.shipping_price,
            "items": order_items,
        }

        email_html_message = render_to_string(
            "email/payment_confirmed.html", context=context
        )
        email_txt_message = render_to_string(
            "email/payment_confirmed.txt", context=context
        )

        msg = EmailMultiAlternatives(
            subject="Thank you for you order",
            body=email_txt_message,
            from_email="noreply@somehost.local",
            to=[user.email],
        )
        msg.attach_alternative(email_html_message, "text/html")
        msg.send()

    def fulfill_e_product_orders(self, order, order_items, user):
        files_to_send = order_items.filter(type="pdf")
        recipient = order.user

        if not files_to_send:
            return

        context = {
            "first_name": recipient.first_name,
        }
        email_html_message = render_to_string(
            "email/e_pattern_fulfillment.html", context=context
        )
        email_txt_message = render_to_string(
            "email/e_pattern_fulfillment.txt", context=context
        )

        msg = EmailMultiAlternatives(
            subject="Your e-patterns are ready!",
            body=email_txt_message,
            from_email="noreply@somehost.local",
            to=[user.email],
        )

        for file in files_to_send:
            pdf_path = settings.MEDIA_ROOT + "/" + str(file.product.pdf)
            msg.attach_file(pdf_path, "application/pdf")

        msg.attach_alternative(email_html_message, "text/html")
        msg.send()

        self.update_delivery_status(order, order_items, files_to_send)

    def post(self, request, *args, **kwargs):
        data = request.body

        if webhook_endpoint_secret:
            sig_header = request.META["HTTP_STRIPE_SIGNATURE"]
            try:
                event = stripe.Webhook.construct_event(
                    data, sig_header, webhook_endpoint_secret
                )
            except stripe.error.SignatureVerificationError as e:
                return Response(
                    {"detail": "Webhook signature verification failed. " + str(e)},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except ValueError as e:
                return Response(
                    {"detail": "Invalid payload."}, status=status.HTTP_400_BAD_REQUEST
                )

        if event and event["type"] == "payment_intent.succeeded":
            order_id = event["data"]["object"]["metadata"]["order_id"]
            order = Order.objects.get(id=order_id)
            order_items = OrderItem.objects.filter(order=order)
            user = order.user

            # TODO: set up async emails to prevent Stripe from retrying event
            self.update_payment_status(order)
            self.send_order_confirm_email(order, order_items, user)
            self.fulfill_e_product_orders(order, order_items, user)

        return Response(status=status.HTTP_200_OK)

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
