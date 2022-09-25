from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Order, OrderItem
from accounts.models import ShippingAddress
from products.models import Product
from .serializers import OrderSerializer
from .permissions import IsStaffOrOwnerOnly


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsStaffOrOwnerOnly,)

    def create(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        order_items = data["order_items"]

        if not order_items:
            return Response(
                {"detail": "No order items"}, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            # Get existing address or create new address db entry
            # Create Order object
            # Create OrderItem objects and add Order as a foreign key
            if data["shipping_address"].get("id"):
                shipping_address = ShippingAddress.objects.get(
                    id=data["shipping_address"]["id"]
                )
            else:
                addr = data["shipping_address"]
                shipping_address = ShippingAddress.objects.create(
                    user=user,
                    first_name=addr["first_name"],
                    last_name=addr["last_name"],
                    address=addr["address"],
                    city=addr["city"],
                    country=addr["country"],
                    in_address_book=addr["in_address_book"],
                )
                if addr["postal_code"] != "":
                    shipping_address.postal_code = addr["postal_code"]
                if addr["phone_number"] != "":
                    shipping_address.phone_number = addr["phone_number"]
                shipping_address.save()

            order = Order.objects.create(
                user=user,
                subtotal_price=data["subtotal_price"],
                shipping_price=data["shipping_price"],
                total_price=data["total_price"],
                shipping_address=shipping_address,
            )
            order.save()
            
            for item in order_items:
                order_item = OrderItem.objects.create(
                    product=Product.objects.get(pk=item["product"]),
                    order=order,
                    name=item["name"],
                    purchased_qty=item["qty"],
                    type=item["itemType"],
                    price=item["price"],
                    image=item["image"]
                )
                order_item.save()

            return Response(self.serializer_class(order, many=False).data)
