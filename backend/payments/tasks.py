from django.core.mail import EmailMultiAlternatives
from celery import shared_task


@shared_task()
def send_email(
    html_message,
    txt_message,
    subject,
    recipient,
    attachment_paths=None,
    attachment_mimetype=None,
):
    msg = EmailMultiAlternatives(
        subject=subject,
        body=txt_message,
        from_email="noreply@somehost.local",  # TODO: replace when setting up SMTP server
        to=recipient,
    )
    msg.attach_alternative(html_message, "text/html")

    if attachment_paths:
        mimetype = attachment_mimetype or None
        for path in attachment_paths:
            msg.attach_file(path, mimetype)

    msg.send()


@shared_task()
def update_delivery_status(order, order_items, sent_file_objs):
    if len(order_items) == len(sent_file_objs):
        order.is_delivered = True
        order.save()
