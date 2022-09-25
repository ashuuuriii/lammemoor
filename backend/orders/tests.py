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
            price=6.31,
            pdf_price=3.31,
            n_stock=0,
        )
        self.product2 = Product.objects.create(
            user=self.user,
            name="Product Name",
            category=1,
            description="Description",
            rating=3.5,
            n_reviews=5,
            price=6.31,
            pdf_price=3.31,
            n_stock=0,
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
        self.assertEqual(new_order_obj.shipping_address, self.shipping_address)

        new_order_item_objs = OrderItem.objects.all()
        self.assertEqual(new_order_item_objs[0].product, self.product1)
        self.assertEqual(new_order_item_objs[1].product, self.product2)

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
