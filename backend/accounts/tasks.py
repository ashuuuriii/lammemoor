from django.core.mail import EmailMultiAlternatives
from celery import shared_task


@shared_task()
def send_email(html_message, txt_message, subject, recipient):
    msg = EmailMultiAlternatives(
        subject=subject,
        body=txt_message,
        from_email="noreply@somehost.local",  # TODO: replace when setting up SMTP server
        to=[recipient],
    )
    msg.attach_alternative(html_message, "text/html")
    msg.send()
