from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class CustomUser(AbstractUser):
    # replace username with an email
    username = models.EmailField(
        blank=False,
        null=False,
        unique=True,
        help_text="Required. You need an email address to log in.",
        error_messages={"unique": "A user with that email already exists."},
    )

class ShippingAddress(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    first_name = models.CharField(max_length=150, blank=False, null=False)
    last_name = models.CharField(max_length=150, blank=False, null=False)
    phone_number = PhoneNumberField(null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postal_code = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shipping_rice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    in_address_book = models.BooleanField()

    def __str__(self):
        return str(self.address)
