from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from django.db import IntegrityError

from .serializers import CustomTokenObtainPairSerializer, CustomUserSerializerWithToken


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = CustomUserSerializerWithToken

    def create(self, request, *args, **kwargs):
        try:
            data = request.data
            user = get_user_model().objects.create(
                username=data["username"],
                password=make_password(data["password"]),
                first_name=data["first_name"],
                last_name=data["last_name"],
                email=data["username"],
            )
            return Response(self.serializer_class(user).data)
        except IntegrityError as e:
            message = "A user with that email already exists."
            return Response({"detail": message}, status.HTTP_500_INTERNAL_SERVER_ERROR)
