from rest_framework import viewsets, generics, status, permissions
from rest_framework.response import Response
from django.db.models import Sum

from .models import Product, Review
from .serializers import ProductSerializer, ReviewSerializer
from .permissions import IsStaffOrReadOnly


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsStaffOrReadOnly,)


class ReviewCreateView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        product = Product.objects.get(id=data["product_id"])

        # check that user hasn't reviewed the product yet.
        user_exists = product.review_set.filter(user=user).exists()

        if user_exists:
            message = "This product has already been reviewed."
            return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)
        else:
            review = Review.objects.create(
                user=user,
                product=product,
                name=user.first_name + user.last_name
                if user.last_name
                else user.first_name,
                rating=data["rating"],
                title=data["title"],
                comment=data["comment"],
            )
            review.save()

            # save total number of reviews for product
            product.n_reviews = product.review_set.count()

            # calculate average rating
            ratings_sum = product.review_set.aggregate(Sum("rating"))
            product.rating = ratings_sum["rating__sum"] / product.n_reviews
            product.save()

            return Response({"Detail": "Review saved"}, status=status.HTTP_201_CREATED)
