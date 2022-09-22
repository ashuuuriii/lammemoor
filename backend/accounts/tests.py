from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.test import APIClient

from .models import ShippingAddress


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


class UserListViewTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(
            username="username@email.com",
            password=make_password("Password123"),
            first_name="First",
            last_name="Last",
            email="username@email.com",
        )
        self.staff_user = get_user_model().objects.create_superuser(
            username="staff@email.com",
            password=make_password("Password123"),
            first_name="First",
            last_name="Last",
            email="staff@email.com",
        )
        self.client = APIClient()

    def test_api_get_non_staff(self):
        # anon user
        response = self.client.get(
            reverse("list_users"),
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # authenciated non-staff user
        self.client.force_authenticate(self.user)
        response = self.client.get(
            reverse("list_users"),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_api_get_is_staff(self):
        self.client.force_authenticate(self.staff_user)

        response = self.client.get(
            reverse("list_users"),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.user)
        self.assertContains(response, self.staff_user)


class UserDetailViewTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(
            username="username@email.com",
            password=make_password("Password123"),
            first_name="First",
            last_name="Last",
            email="username@email.com",
        )
        self.staff_user = get_user_model().objects.create_superuser(
            username="staff@email.com",
            password=make_password("Password123"),
            first_name="First",
            last_name="Last",
            email="staff@email.com",
        )
        self.client = APIClient()

    def test_api_get_no_permission(self):
        # anon user
        response = self.client.get(
            reverse("user_detail", kwargs={"pk": self.user.id}),
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_api_get_user(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            reverse("user_detail", kwargs={"pk": self.user.id}),
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.user)

        response = self.client.get(
            reverse("user_detail", kwargs={"pk": self.staff_user.id}),
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_api_post_user(self):
        self.client.force_authenticate(self.user)
        response = self.client.put(
            reverse("user_detail", kwargs={"pk": self.user.id}),
            {
                "first_name": "updated",
                "last_name": self.user.last_name,
                "username": self.user.email,
                "email": self.user.email,
                "password": "",
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.first_name, "updated")

    def test_staff_user_permissions(self):
        self.client.force_authenticate(self.staff_user)
        response = self.client.get(
            reverse("user_detail", kwargs={"pk": self.user.id}),
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.user)

        response = self.client.get(
            reverse("user_detail", kwargs={"pk": self.staff_user.id}),
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.staff_user)


class ShippingAddressViewsetTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(
            username="username@email.com",
            password=make_password("Password123"),
            first_name="First",
            last_name="Last",
            email="username@email.com",
        )
        self.staff_user = get_user_model().objects.create_superuser(
            username="staff@email.com",
            password=make_password("Password123"),
            first_name="First",
            last_name="Last",
            email="staff@email.com",
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

    def test_list_view(self):
        # test anon user
        response = self.client.get(reverse("addresses-list"))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # test user
        self.client.force_authenticate(self.user)
        response = self.client.get(reverse("addresses-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.shipping_address)

        # test staff user
        self.client.force_authenticate(self.staff_user)
        response = self.client.get(reverse("addresses-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.shipping_address)
