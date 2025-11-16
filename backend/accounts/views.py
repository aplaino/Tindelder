from django.shortcuts import render

# Create your views here.
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .serializers import RegisterSerializer
from profiles.models import Profile

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        # validate + create user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        Profile.objects.get_or_create(user=user)

        # issue JWT tokens so they’re logged in right away
        token_serializer = TokenObtainPairSerializer(data={
            "username": user.username,
            "password": request.data["password"],
        })
        token_serializer.is_valid(raise_exception=True)
        tokens = token_serializer.validated_data  # {"refresh": "...", "access": "..."}

        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "user": serializer.data,
                "tokens": tokens,
            },
            status=status.HTTP_201_CREATED,
            headers=headers,
        )
