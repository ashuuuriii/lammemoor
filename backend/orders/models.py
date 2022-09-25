from django.db import models
from django.contrib.auth import get_user_model

from products.models import Product
from accounts.models import ShippingAddress


class Order(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True)
    subtotal_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=False, blank=False
    )
    shipping_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=False, blank=False
    )
    total_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=False, blank=False
    )
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    shipping_address = models.ForeignKey(
        ShippingAddress, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return str(self.created_at)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    purchased_qty = models.IntegerField(null=True, blank=True, default=0)
    type = models.CharField(max_length=200, null=False, blank=False)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return str(self.name)
