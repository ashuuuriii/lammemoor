from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import ProductViewSet, ReviewCreateView

router = SimpleRouter()
router.register("", ProductViewSet, basename="products")

urlpatterns = [
    path("review_create", ReviewCreateView.as_view(), name="create-review")
] + router.urls
