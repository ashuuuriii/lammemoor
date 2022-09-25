from django.test import TestCase
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.urls import reverse
from rest_framework import status

from .models import Product


class ProductViewSetTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(
            username="username@email.com",
            password=make_password("Password123"),
            first_name="First",
            last_name="Last",
            email="username@email.com",
        )
        self.product = Product.objects.create(
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

    def test_api_list_view(self):
        response = self.client.get(reverse("products-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.product)

    def test_api_detail_view(self):
        response = self.client.get(reverse("products-detail", kwargs={"pk": 1}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.product)
        self.assertEqual(response.data["name"], "Product Name")
