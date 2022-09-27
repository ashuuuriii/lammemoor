import decimal

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from orders.models import Order


class StripePaymentIntentViewTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(
            username="username@email.com",
            password=make_password("Password123"),
            first_name="First",
            last_name="Last",
            email="username@email.com",
        )
        self.order = Order.objects.create(
            user=self.user,
            subtotal_price=decimal.Decimal("15.52"),
            shipping_price=decimal.Decimal("5.00"),
            total_price=decimal.Decimal("20.52"),
            shipping_address=None,
        )
        self.client = APIClient()

    def test_clientSecret_successfully_returned(self):
        self.client.force_authenticate(self.user)
        response = self.client.post(
            reverse("payment-intent"), {"order_id": self.order.pk}
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, "clientSecret")

    def test_invalid_order_id(self):
        self.client.force_authenticate(self.user)
        response = self.client.post(
            reverse("payment-intent"), {"order_id": 123}
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_anon_user(self):
        response = self.client.post(
            reverse("payment-intent"), {"order_id": 123}
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

