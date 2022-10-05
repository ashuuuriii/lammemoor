from rest_framework import viewsets, generics, status, permissions
from rest_framework.response import Response
from django.db.models import Sum
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .models import Product, Review
from .serializers import ProductSerializer, ReviewSerializer
from .permissions import IsStaffOrReadOnly


PRODUCTS_PER_PAGE = 4


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsStaffOrReadOnly,)

    def list(self, request, *args, **kwargs):
        new = request.query_params.get("new")
        if new:
            products = Product.objects.all().order_by("-created_at")[: int(new)]
            serializer = self.serializer_class(products, many=True)
            return Response(
                {
                    "products": serializer.data,
                    "page": None,
                    "pages": None,
                }
            )

        category = request.query_params.getlist("category")

        if category == []:
            queryset = Product.objects.all()
        else:
            queryset = Product.objects.filter(category__in=category)

        if len(queryset) < 1:
            return Response(
                {"products": "Empty queryset"},
                status.HTTP_200_OK,
            )

        page = request.query_params.get("page")
        paginator = Paginator(queryset, PRODUCTS_PER_PAGE)

        try:
            products = paginator.page(page)
        except PageNotAnInteger:
            products = paginator.page(1)
        except EmptyPage:
            products = paginator.page(1)
            page = 1

        if page == None or page == "":
            page = 1

        page = int(page)
        serializer = self.serializer_class(products, many=True)

        return Response(
            {
                "products": serializer.data,
                "page": page,
                "pages": paginator.num_pages,
            }
        )


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
