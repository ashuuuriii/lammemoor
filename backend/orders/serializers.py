from rest_framework import serializers

from products.serializers import ProductSerializer
from accounts.serializers import ShippingAddressSerializer
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    shipping_address = ShippingAddressSerializer(many=False)
    user = serializers.StringRelatedField(many=False)
    order_items = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_order_items(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
