from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status, permissions, viewsets
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from django.db import IntegrityError

from .serializers import (
    CustomTokenObtainPairSerializer,
    CustomUserSerializerWithToken,
    CustomUserSerializer,
    ShippingAddressSerializer,
)
from .models import ShippingAddress
from .permissions import IsStaffOrOwnerOnly


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


class UserListView(generics.ListAPIView):
    serializer_class = CustomUserSerializer
    queryset = get_user_model().objects.all()
    permission_classes = (permissions.IsAdminUser,)


class UserDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomUserSerializerWithToken
    queryset = get_user_model().objects.all()
    permission_classes = (IsStaffOrOwnerOnly,)

    def update(self, request, *args, **kwargs):
        try:
            data = request.data
            user = request.user
            serializer = self.serializer_class(request.user, many=False)
            user.first_name = data["first_name"]
            user.last_name = data["last_name"]
            user.username = data["email"]
            user.email = data["email"]
            if data["password"] != "":
                user.password = make_password(data["password"])
            user.save()
            return Response(serializer.data)
        except IntegrityError as e:
            message = "A user with that email already exists."
            return Response({"detail": message}, status.HTTP_500_INTERNAL_SERVER_ERROR)


class ShippingAddressViewset(viewsets.ModelViewSet):
    serializer_class = ShippingAddressSerializer
    queryset = ShippingAddress.objects.all()
    permission_classes = (IsStaffOrOwnerOnly,)

    def list(self, request, *args, **kwargs):
        user = request.user
        if request.user.is_staff:
            addresses = ShippingAddress.objects.all()
        else:
            addresses = user.shippingaddress_set.all()
        return Response(self.serializer_class(addresses, many=True).data)

    def create(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        new_address = ShippingAddress.objects.create(
            user=user,
            first_name=data["first_name"],
            last_name=data["last_name"],
            address=data["address"],
            city=data["city"],
            country=data["country"],
            in_address_book=data["in_address_book"],
        )
        if data["postal_code"] != "":
            new_address.postal_code = data["postal_code"]
        if data["phone_number"] != "":
            new_address.phone_number = data["phone_number"]
        new_address.save()
        return Response(
            {"detail": "new address added successfully"}, status.HTTP_201_CREATED
        )

    def update(self, request, *args, **kwargs):
        data = request.data
        address = ShippingAddress.objects.get(id=kwargs.get("pk"))
        address.first_name = data["first_name"]
        address.last_name = data["last_name"]
        address.address = data["address"]
        address.city = data["city"]
        address.country = data["country"]
        address.in_address_book = data["in_address_book"]
        if data["postal_code"] != "":
            address.postal_code = data["postal_code"]
        if data["phone_number"] != "":
            address.phone_number = data["phone_number"]
        address.save()
        return Response({"detail": "address updated"}, status.HTTP_202_ACCEPTED)


class RemoveFromAddressBookView(generics.UpdateAPIView):
    serializer_class = ShippingAddressSerializer
    queryset = ShippingAddress.objects.all()
    permission_classes = (IsStaffOrOwnerOnly,)

    def update(self, request, *args, **kwargs):
        address = ShippingAddress.objects.get(id=kwargs.get("pk"))
        address.in_address_book = request.data["in_address_book"]
        return Response(
            {"detail": "address visibility updated"}, status.HTTP_202_ACCEPTED
        )
