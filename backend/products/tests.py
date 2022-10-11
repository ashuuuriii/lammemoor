from django.test import TestCase
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .models import Product, Review


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
            name="Product Name1",
            category=1,
            description="Description",
            rating=3.5,
            n_reviews=5,
            price=6.31,
            pdf_price=3.31,
            n_stock=0,
        )
        self.review = Review.objects.create(
            user=self.user,
            product=self.product,
            name="Name",
            rating=3,
            title="Review Title",
            comment="Lorem Ipsum, Lorem Ipsum",
        )

    def test_api_list_view(self):
        response = self.client.get(reverse("products-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.product)
        self.assertContains(response, self.review)
        self.assertEqual(response.data["page"], 1)
        self.assertEqual(response.data["pages"], 1)

    def test_api_list_view_with_category(self):
        product_2 = Product.objects.create(
            user=self.user,
            name="Product Name2",
            category=2,
            description="Description",
            rating=3.5,
            n_reviews=5,
            price=6.31,
            pdf_price=3.31,
            n_stock=0,
        )

        # filter should only contain category 1
        response = response = self.client.get(
            "%s?category=%s" % (reverse("products-list"), "1")
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.product)
        self.assertNotContains(response, product_2)

    def test_api_list_view_new(self):
        product_2 = Product.objects.create(
            user=self.user,
            name="Product Name2",
            category=2,
            description="Description",
            rating=3.5,
            n_reviews=5,
            price=6.31,
            pdf_price=3.31,
            n_stock=0,
        )

        # new should only return 1 latest product based on create_at timestamp.
        response = response = self.client.get(
            "%s?new=%s" % (reverse("products-list"), "1")
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response.data)
        self.assertContains(response, product_2)
        self.assertNotContains(response, self.product)

    def test_api_detail_view(self):
        response = self.client.get(reverse("products-detail", kwargs={"pk": self.product.pk}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.product)
        self.assertEqual(response.data["name"], "Product Name1")
        self.assertContains(response, self.review)


class ReviewCreateViewTest(TestCase):
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
        self.client = APIClient()

    def test_anon_user(self):
        review = {
            "product_id": self.product.pk,
            "rating": 3,
            "title": "Title 1",
            "comment": "Comment 1",
        }

        response = self.client.post(reverse("create-review"), review)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_review_is_added_to_model(self):
        review = {
            "product_id": self.product.pk,
            "rating": 3,
            "title": "Title 1",
            "comment": "Comment 1",
        }
        self.client.force_authenticate(self.user)

        response = self.client.post(reverse("create-review"), review)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        last_review = Review.objects.last()
        self.assertEqual(last_review.rating, review["rating"])
        self.assertEqual(last_review.title, review["title"])
        self.assertEqual(last_review.comment, review["comment"])
        self.assertEqual(last_review.user, self.user)
        self.assertEqual(last_review.product, self.product)

    def test_duplicate_review(self):
        review_1 = {
            "product_id": self.product.pk,
            "rating": 3,
            "title": "Title 1",
            "comment": "Comment 1",
        }
        review_2 = {
            "product_id": self.product.pk,
            "rating": 3,
            "title": "Title 2",
            "comment": "Comment 2",
        }
        self.client.force_authenticate(self.user)

        response_1 = self.client.post(reverse("create-review"), review_1)
        self.assertEqual(response_1.status_code, status.HTTP_201_CREATED)

        response_2 = self.client.post(reverse("create-review"), review_2)
        self.assertEqual(response_2.status_code, status.HTTP_400_BAD_REQUEST)

    def test_product_model_updates(self):
        user_2 = get_user_model().objects.create(
            username="user2@email.com",
            password=make_password("Password123"),
            first_name="First",
            last_name="Last",
            email="username2@email.com",
        )
        review_1 = {
            "product_id": self.product.pk,
            "rating": 3,
            "title": "Title 1",
            "comment": "Comment 1",
        }
        review_2 = {
            "product_id": self.product.pk,
            "rating": 5,
            "title": "Title 2",
            "comment": "Comment 2",
        }
        self.client.force_authenticate(self.user)

        response_1 = self.client.post(reverse("create-review"), review_1)
        self.assertEqual(response_1.status_code, status.HTTP_201_CREATED)

        self.client.force_authenticate(user_2)
        response_2 = self.client.post(reverse("create-review"), review_2)
        self.assertEqual(response_2.status_code, status.HTTP_201_CREATED)

        updated_product = Product.objects.last()
        self.assertEqual(updated_product.n_reviews, 2)
        self.assertEqual(updated_product.rating, 4)
