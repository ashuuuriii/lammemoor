from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.template.loader import render_to_string
from backend import settings

from .tasks import send_email


@receiver(reset_password_token_created)
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):
    context = {
        "current_user": reset_password_token.user,
        "username": reset_password_token.user.username,
        "first_name": reset_password_token.user.first_name,
        "email": reset_password_token.user.email,
        "reset_password_url": "{}?token={}".format(
            settings.FRONT_END_BASE_URL + "accounts/password_reset/reset",
            reset_password_token.key,
        ),
    }

    email_html_message = render_to_string(
        "email/user_reset_password.html", context=context
    )
    email_txt_message = render_to_string(
        "email/user_reset_password.txt", context=context
    )
    subject = "Password reset for Lammermoor"
    recipient = reset_password_token.user.email

    send_email.delay(email_html_message, email_txt_message, subject, recipient)
