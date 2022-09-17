from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import EmailMultiAlternatives
from django.urls import reverse
from django.template.loader import render_to_string
from backend import settings


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

    # TODO: make this async
    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_txt_message,
        # from:
        "noreply@somehost.local",  # TODO: replace when setting up SMTP server
        # to:
        [reset_password_token.user.email],
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
