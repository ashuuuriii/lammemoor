from django.urls import path
from .views import CustomTokenObtainPairView, UserRegistrationView

urlpatterns = [
    path("login", CustomTokenObtainPairView.as_view(), name="login"),
    path("register", UserRegistrationView.as_view(), name="register"),
]
