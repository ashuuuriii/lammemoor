import decimal

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from products.models import Product
from accounts.models import ShippingAddress
from .models import Order, OrderItem


class OrderViewSetTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(
            username="username@email.com",
            password=make_password("Password123"),
            first_name="First",
            last_name="Last",
            email="username@email.com",
        )
        self.product1 = Product.objects.create(
            user=self.user,
            name="Product Name",
            category=1,
            description="Description",
            rating=3.5,
            n_reviews=5,
            price=decimal.Decimal(6.31),
            pdf_price=decimal.Decimal(3.31),
            n_stock=1,
        )
        self.product2 = Product.objects.create(
            user=self.user,
            name="Product Name",
            category=1,
            description="Description",
            rating=3.5,
            n_reviews=5,
            price=decimal.Decimal(6.31),
            pdf_price=decimal.Decimal(3.31),
            n_stock=5,
        )
        self.product3 = Product.objects.create(
            user=self.user,
            name="Product Name",
            category=1,
            description="Description",
            rating=3.5,
            n_reviews=5,
            price=decimal.Decimal(10.50),
            pdf_price=decimal.Decimal(3.31),
            n_stock=5,
        )
        self.shipping_address = ShippingAddress.objects.create(
            user=self.user,
            first_name="First",
            last_name="Last",
            address="street",
            city="City",
            postal_code="123 456",
            country="country",
            in_address_book=True,
        )
        self.client = APIClient()
        decimal.getcontext().prec = 7

    def test_create_order_with_address_book(self):
        order = {
            "shipping_address": {
                "id": 1,
                "first_name": "First",
                "last_name": "Last",
                "address": "street",
                "city": "city",
                "postal_code": "123 456",
                "country": "country",
                "in_address_book": True,
            },
            "order_items": [
                {
                    "product": self.product1.pk,
                    "name": self.product1.name,
                    "qty": None,
                    "itemType": "pdf",
                    "price": 3.31,
                    "image": "imagelink",
                },
                {
                    "product": self.product2.pk,
                    "name": self.product2.name,
                    "qty": 2,
                    "itemType": "paper",
                    "price": 12.62,
                    "image": "imagelink",
                },
            ],
        }

        self.client.force_authenticate(self.user)

        response = self.client.post(reverse("orders-list"), order, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        new_order_obj = Order.objects.last()
        self.assertEqual(new_order_obj.user, self.user)
        self.assertEqual(new_order_obj.shipping_address, self.shipping_address)

        new_order_item_objs = OrderItem.objects.all()
        self.assertEqual(new_order_item_objs[0].product, self.product1)
        self.assertEqual(new_order_item_objs[1].product, self.product2)

        # product1 quantity should not be changed because of item type
        # product2's quantity needs to be reduced based on order amount
        self.assertEqual(Product.objects.all()[0].n_stock, 1)
        self.assertEqual(Product.objects.all()[1].n_stock, 3)

    def test_prices_with_shipping(self):
        order = {
            "shipping_address": {
                "id": 1,
                "first_name": "First",
                "last_name": "Last",
                "address": "street",
                "city": "city",
                "postal_code": "123 456",
                "country": "country",
                "in_address_book": True,
            },
            "order_items": [
                {
                    "product": self.product1.pk,
                    "name": self.product1.name,
                    "qty": None,
                    "itemType": "pdf",
                    "price": 3.31,
                    "image": "imagelink",
                },
                {
                    "product": self.product2.pk,
                    "name": self.product2.name,
                    "qty": 2,
                    "itemType": "paper",
                    "price": 12.62,
                    "image": "imagelink",
                },
            ],
        }

        self.client.force_authenticate(self.user)

        response = self.client.post(reverse("orders-list"), order, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        new_order_obj = Order.objects.last()
        self.assertEqual(new_order_obj.subtotal_price, decimal.Decimal("15.93"))
        self.assertEqual(new_order_obj.shipping_price, decimal.Decimal("5.00"))
        self.assertEqual(new_order_obj.total_price, decimal.Decimal("20.93"))

    def test_prices_no_shipping_over_free_shipping_cutoff(self):
        order = {
            "shipping_address": {
                "id": 1,
                "first_name": "First",
                "last_name": "Last",
                "address": "street",
                "city": "city",
                "postal_code": "123 456",
                "country": "country",
                "in_address_book": True,
            },
            "order_items": [
                {
                    "product": self.product1.pk,
                    "name": self.product1.name,
                    "qty": None,
                    "itemType": "pdf",
                    "price": 3.31,
                    "image": "imagelink",
                },
                {
                    "product": self.product2.pk,
                    "name": self.product2.name,
                    "qty": 2,
                    "itemType": "paper",
                    "price": 12.62,
                    "image": "imagelink",
                },
                {
                    "product": self.product3.pk,
                    "name": self.product3.name,
                    "qty": 5,
                    "itemType": "paper",
                    "price": 52.50,
                    "image": "imagelink",
                },
            ],
        }

        self.client.force_authenticate(self.user)

        response = self.client.post(reverse("orders-list"), order, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        new_order_obj = Order.objects.last()
        self.assertEqual(new_order_obj.subtotal_price, decimal.Decimal("68.43"))
        self.assertEqual(new_order_obj.shipping_price, decimal.Decimal("0.00"))
        self.assertEqual(new_order_obj.total_price, decimal.Decimal("68.43"))

    def test_prices_no_shipping_pdf_only(self):
        order = {
            "shipping_address": {
                "id": 1,
                "first_name": "First",
                "last_name": "Last",
                "address": "street",
                "city": "city",
                "postal_code": "123 456",
                "country": "country",
                "in_address_book": True,
            },
            "order_items": [
                {
                    "product": self.product1.pk,
                    "name": self.product1.name,
                    "qty": None,
                    "itemType": "pdf",
                    "price": 3.31,
                    "image": "imagelink",
                },
                {
                    "product": self.product2.pk,
                    "name": self.product2.name,
                    "qty": None,
                    "itemType": "pdf",
                    "price": 3.31,
                    "image": "imagelink",
                },
            ],
        }

        self.client.force_authenticate(self.user)

        response = self.client.post(reverse("orders-list"), order, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        new_order_obj = Order.objects.last()
        self.assertEqual(new_order_obj.subtotal_price, decimal.Decimal("6.62"))
        self.assertEqual(new_order_obj.shipping_price, decimal.Decimal("0.00"))
        self.assertEqual(new_order_obj.total_price, decimal.Decimal("6.62"))

    def test_newly_entered_address(self):
        order = {
            "shipping_address": {
                "first_name": "New First",
                "last_name": "Last",
                "address": "street",
                "city": "city",
                "postal_code": "123 456",
                "country": "country",
                "in_address_book": True,
                "phone_number": "",
                "postal_code": "",
            },
            "shipping_price": 5.00,
            "total_price": 20.93,
            "subtotal_price": 15.93,
            "order_items": [
                {
                    "product": self.product1.pk,
                    "name": self.product1.name,
                    "qty": None,
                    "itemType": "pdf",
                    "price": 3.31,
                    "image": "imagelink",
                },
                {
                    "product": self.product2.pk,
                    "name": self.product2.name,
                    "qty": 2,
                    "itemType": "paper",
                    "price": 12.62,
                    "image": "imagelink",
                },
            ],
        }

        self.client.force_authenticate(self.user)

        response = self.client.post(reverse("orders-list"), order, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        new_order_obj = Order.objects.last()
        self.assertEqual(new_order_obj.user, self.user)

        new_order_item_objs = OrderItem.objects.all()
        self.assertEqual(new_order_item_objs[0].product, self.product1)
        self.assertEqual(new_order_item_objs[1].product, self.product2)

        self.assertEqual(Product.objects.all()[0].n_stock, 1)
        self.assertEqual(Product.objects.all()[1].n_stock, 3)

        new_address = ShippingAddress.objects.last()
        self.assertEqual(new_address.first_name, "New First")

    def test_emptry_cart(self):
        order = {
            "shipping_address": {
                "first_name": "New First",
                "last_name": "Last",
                "address": "street",
                "city": "city",
                "postal_code": "123 456",
                "country": "country",
                "in_address_book": True,
                "phone_number": "",
                "postal_code": "",
            },
            "shipping_price": 5.00,
            "total_price": 20.93,
            "subtotal_price": 15.93,
            "order_items": [],
        }

        self.client.force_authenticate(self.user)

        response = self.client.post(reverse("orders-list"), order, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_anon_user(self):
        order = {
            "shipping_address": {
                "first_name": "New First",
                "last_name": "Last",
                "address": "street",
                "city": "city",
                "postal_code": "123 456",
                "country": "country",
                "in_address_book": True,
                "phone_number": "",
                "postal_code": "",
            },
            "shipping_price": 5.00,
            "total_price": 20.93,
            "subtotal_price": 15.93,
            "order_items": [
                {
                    "product": self.product1.pk,
                    "name": self.product1.name,
                    "qty": None,
                    "itemType": "pdf",
                    "price": 3.31,
                    "image": "imagelink",
                },
                {
                    "product": self.product2.pk,
                    "name": self.product2.name,
                    "qty": 2,
                    "itemType": "paper",
                    "price": 12.62,
                    "image": "imagelink",
                },
            ],
        }

        response = self.client.post(reverse("orders-list"), order, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_no_shipping_address_pdf_only(self):
        order = {
            "shipping_address": "",
            "shipping_price": 5.00,
            "total_price": 20.93,
            "subtotal_price": 15.93,
            "order_items": [
                {
                    "product": self.product1.pk,
                    "name": self.product1.name,
                    "qty": None,
                    "itemType": "pdf",
                    "price": 3.31,
                    "image": "imagelink",
                },
                {
                    "product": self.product2.pk,
                    "name": self.product2.name,
                    "qty": 2,
                    "itemType": "pdf",
                    "price": 12.62,
                    "image": "imagelink",
                },
            ],
        }

        self.client.force_authenticate(self.user)

        response = self.client.post(reverse("orders-list"), order, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        new_order_obj = Order.objects.last()
        self.assertEqual(new_order_obj.user, self.user)
        self.assertIsNone(new_order_obj.shipping_address)

        # neither product's n_sotck should be updated
        self.assertEqual(Product.objects.all()[0].n_stock, 1)
        self.assertEqual(Product.objects.all()[1].n_stock, 5)

        new_order_item_objs = OrderItem.objects.all()
        self.assertEqual(new_order_item_objs[0].product, self.product1)
        self.assertEqual(new_order_item_objs[1].product, self.product2)

    def test_no_shipping_address_raises_400(self):
        order = {
            "shipping_address": "",
            "shipping_price": 5.00,
            "total_price": 20.93,
            "subtotal_price": 15.93,
            "order_items": [
                {
                    "product": self.product1.pk,
                    "name": self.product1.name,
                    "qty": None,
                    "itemType": "pdf",
                    "price": 3.31,
                    "image": "imagelink",
                },
                {
                    "product": self.product2.pk,
                    "name": self.product2.name,
                    "qty": 2,
                    "itemType": "paper",
                    "price": 12.62,
                    "image": "imagelink",
                },
            ],
        }

        self.client.force_authenticate(self.user)

        response = self.client.post(reverse("orders-list"), order, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["detail"],
            "No shipping address provided with physical product.",
        )

    def test_order_detail_view(self):
        order = Order.objects.create(
            user=self.user,
            subtotal_price=10.75,
            shipping_price=0.00,
            total_price=10.75,
        )

        order_item = OrderItem.objects.create(
            product=self.product1,
            order=order,
            name=self.product1.name,
            type="pdf",
            price=self.product1.price,
            image=self.product1.image,
        )

        # test anon user
        response = self.client.get(reverse("orders-detail", kwargs={"pk": 1}))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # test order creator
        self.client.force_authenticate(self.user)
        response = self.client.get(reverse("orders-detail", kwargs={"pk": 1}))
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, order_item)
        self.assertEqual(data["subtotal_price"], str(order.subtotal_price))
        self.assertEqual(data["total_price"], str(order.total_price))

    def test_order_list_view(self):
        order = Order.objects.create(
            user=self.user,
            subtotal_price=10.75,
            shipping_price=0.00,
            total_price=10.75,
        )

        order_item = OrderItem.objects.create(
            product=self.product1,
            order=order,
            name=self.product1.name,
            type="pdf",
            price=self.product1.price,
            image=self.product1.image,
        )

        self.client.force_authenticate(self.user)
        response = self.client.get(reverse("orders-list"))
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, order_item)
        self.assertEqual(data["orders"][0]["user"], str(self.user))
        self.assertEqual(data["page"], 1)
        self.assertEqual(data["pages"], 1)
