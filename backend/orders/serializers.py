from rest_framework import serializers

from products.serializers import ProductSerializer
from accounts.serializers import ShippingAddressSerializer
from .models import Order


class OrderSerializer(serializers.Serializer):
    shipping_address = ShippingAddressSerializer(many=False)
    user = serializers.StringRelatedField(many=False)

    class Meta:
        model = Order
        fields = "__all__"
