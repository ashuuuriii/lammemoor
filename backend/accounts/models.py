from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    # replace username with an email
    username = models.EmailField(
        blank=False,
        null=False,
        unique=True,
        help_text="Required. You need an email address to log in.",
        error_messages={"unique": "A user with that email already exists."},
    )
