from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import (
    CustomTokenObtainPairView,
    UserRegistrationView,
    UserListView,
    UserDetailView,
    ShippingAddressViewset,
)


router = SimpleRouter()
router.register("addresses", ShippingAddressViewset, basename="addresses")

urlpatterns = [
    path("login", CustomTokenObtainPairView.as_view(), name="login"),
    path("register", UserRegistrationView.as_view(), name="register"),
    path("list_users", UserListView.as_view(), name="list_users"),
    path("user_detail/<str:pk>", UserDetailView.as_view(), name="user_detail"),
] + router.urls
