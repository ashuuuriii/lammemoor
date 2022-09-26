import decimal

from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Order, OrderItem
from accounts.models import ShippingAddress
from products.models import Product
from .serializers import OrderSerializer
from .permissions import IsStaffOrOwnerOnly


PRICE_DECIMAL_PRECISION = 7
FREE_SHIPPING_CUTOFF = "50.00"
SHIPPING_PRICE = "5.00"


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsStaffOrOwnerOnly,)

    def update_order_price(self, order, order_items_prices, pdf_only):
        order.subtotal_price = decimal.Decimal(sum(order_items_prices))

        if (
            order.subtotal_price < decimal.Decimal(FREE_SHIPPING_CUTOFF)
            and not pdf_only
        ):
            order.shipping_price = decimal.Decimal(SHIPPING_PRICE)

        order.total_price = decimal.Decimal(order.shipping_price + order.subtotal_price)

    def get_order_item_price(self, product, item):
        if item["itemType"] == "pdf":
            return product.pdf_price
        else:
            return product.price * item["qty"]

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

    def create_order_items(self, order_items, order):
        # Create OrderItem objects and add Order as a foreign key
        order_items_prices = []

        for item in order_items:
            product = Product.objects.get(pk=item["product"])
            price = decimal.Decimal(self.get_order_item_price(product, item))

            order_item = OrderItem.objects.create(
                product=product,
                order=order,
                name=item["name"],
                purchased_qty=item["qty"],
                type=item["itemType"],
                price=price,
                image=item["image"],
            )

            if order_item.type == "paper":
                self.update_product_quantity(product, item["qty"])

            order_items_prices.append(price)

            order_item.save()

        return order_items_prices

    def create(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        order_items = data["order_items"]
        pdf_only = all([item["itemType"] == "pdf" for item in order_items])

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
            elif not pdf_only:
                return Response(
                    {"detail": "No shipping address provided with physical product."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            else:
                shipping_address = None

            decimal.getcontext().prec = PRICE_DECIMAL_PRECISION

            order = Order.objects.create(
                user=user,
                subtotal_price=decimal.Decimal(0.00),
                shipping_price=decimal.Decimal(0.00),
                total_price=decimal.Decimal(0.00),
                shipping_address=shipping_address,
            )

            order_items_prices = self.create_order_items(order_items, order)
            self.update_order_price(order, order_items_prices, pdf_only)
            order.save()

            return Response(self.serializer_class(order, many=False).data)
