from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
import stripe

from orders.models import Order


stripe.api_key = settings.STRIPE_SECRET_KEY


class StripePaymentIntentView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            data = request.data
            order = Order.objects.get(id=data["order_id"])

            intent = stripe.PaymentIntent.create(
                amount=int(order.total_price*100),
                currency="gbp",
                automatic_payment_methods={
                    "enabled": True,
                },
            )
            return Response(
                {"clientSecret": intent["client_secret"]}, status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_403_FORBIDDEN)
