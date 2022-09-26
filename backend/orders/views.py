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

    def update_product_quantity(self, product, quantity):
        product.n_stock -= quantity
        product.save()

    def get_shipping_address_foreign_key(self, address_data):
        # Check if any item in order items require a shipping address.
        # Get existing address or create new address db entry if shipping address is required.
        if address_data.get("id"):
            shipping_address = ShippingAddress.objects.get(id=address_data["id"])
        else:
            shipping_address = ShippingAddress.objects.create(
                user=self.request.user,
                first_name=address_data["first_name"],
                last_name=address_data["last_name"],
                address=address_data["address"],
                city=address_data["city"],
                country=address_data["country"],
                in_address_book=address_data["in_address_book"],
            )
            if address_data["postal_code"] != "":
                shipping_address.postal_code = address_data["postal_code"]
            if address_data["phone_number"] != "":
                shipping_address.phone_number = address_data["phone_number"]
            shipping_address.save()
        return shipping_address

    def save_order_items(self, order_items, order):
        # Create OrderItem objects and add Order as a foreign key
        for item in order_items:
            product = Product.objects.get(pk=item["product"])
            order_item = OrderItem.objects.create(
                product=product,
                order=order,
                name=item["name"],
                purchased_qty=item["qty"],
                type=item["itemType"],
                price=item["price"],
                image=item["image"],
            )

            if order_item.type == "paper":
                self.update_product_quantity(product, item["qty"])

            order_item.save()

    def create(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        order_items = data["order_items"]

        if not order_items:
            return Response(
                {"detail": "No order items"}, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            # Create Order object
            if data["shipping_address"] != "":
                shipping_address = self.get_shipping_address_foreign_key(
                    data["shipping_address"]
                )
            elif not all([item["itemType"] == "pdf" for item in order_items]):
                return Response(
                    {"detail": "No shipping address provided with physical product."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            else:
                shipping_address = None

            order = Order.objects.create(
                user=user,
                subtotal_price=data["subtotal_price"],
                shipping_price=data["shipping_price"],
                total_price=data["total_price"],
                shipping_address=shipping_address,
            )
            order.save()
            self.save_order_items(order_items, order)

            return Response(self.serializer_class(order, many=False).data)
