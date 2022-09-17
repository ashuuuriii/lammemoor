from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import status


class UserRegistraionViewTest(TestCase):
    def test_api_createview_post(self):
        response = self.client.post(
            reverse("register"),
            {
                "username": "username@email.com",
                "password": "Password123",
                "first_name": "First",
                "last_name": "Last",
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # assert model tests
        user_obj = get_user_model().objects.last()
        self.assertEqual(user_obj.username, "username@email.com")
        self.assertEqual(user_obj.email, "username@email.com")
        self.assertEqual(user_obj.first_name, "First")
        self.assertEqual(user_obj.last_name, "Last")


class CustomTokenObtainPairViewTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(
            username="username@email.com",
            password=make_password("Password123"),
            first_name="First",
            last_name="Last",
            email="username@email.com",
        )

    def test_api_post(self):
        response = self.client.post(
            reverse("login"),
            {"username": "username@email.com", "password": "Password123"},
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, "token")
        self.assertContains(response, "first_name")
        self.assertContains(response, "id")
        self.assertEqual(response.data["id"], self.user.id)
