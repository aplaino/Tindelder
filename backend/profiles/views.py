from django.db.models import Q
from django.shortcuts import get_object_or_404

from rest_framework import generics, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.response import Response

from .models import Profile, ProfilePhoto, swipe, match, message
from .serializers import (
    ProfileSerializer,
    ProfilePhotoSerializer,
    MatchSerializer,
    MessageSerializer,
)



class ProfileMeView(generics.RetrieveUpdateAPIView):
    """
    GET  /api/profile/me/  -> your profile
    PUT  /api/profile/me/  -> update your profile
    """
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # auto-create an empty Profile if it doesn't exist yet
        profile, _ = Profile.objects.get_or_create(user=self.request.user)
        return profile


class ProfileDetailView(generics.RetrieveAPIView):
    """
    GET /api/profiles/<id>/ -> view someone else's profile
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProfilePhotoUploadView(generics.CreateAPIView):
    """
    POST /api/profile/me/photos/
      form-data: image=<file>, order=<0-4>
    """
    serializer_class = ProfilePhotoSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        profile, _ = Profile.objects.get_or_create(user=self.request.user)
        if profile.photos.count() >= 5:
            raise ValidationError("You can only upload up to 5 photos.")
        serializer.save(profile=profile)

class DiscoverProfilesView(generics.ListAPIView):
    """
    GET /api/profiles/discover/
    List profiles the current user can swipe on:
    - not themselves
    - not people they've already swiped on
    """
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        current_profile, _ = Profile.objects.get_or_create(user=user)

        # all profiles this user has already swiped on
        swiped_ids = swipe.objects.filter(
            profile=current_profile
        ).values_list("target_profile_id", flat=True)

        return (
            Profile.objects
            .exclude(id=current_profile.id)
            .exclude(id__in=swiped_ids)
        )


class LikeProfileView(generics.GenericAPIView):
    """
    POST /api/profiles/<pk>/like/
    Current user likes target profile.
    If target already liked them, create a match.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        user = request.user
        current_profile, _ = Profile.objects.get_or_create(user=user)

        try:
            target_profile = Profile.objects.get(pk=pk)
        except Profile.DoesNotExist:
            return Response(
                {"detail": "Profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if current_profile.id == target_profile.id:
            return Response(
                {"detail": "You cannot like yourself."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # create or update swipe
        swipe.objects.update_or_create(
            profile=current_profile,
            target_profile=target_profile,
            defaults={"liked": True},
        )

        # check if they already liked you
        opposite_like = swipe.objects.filter(
            profile=target_profile,
            target_profile=current_profile,
            liked=True,
        ).exists()

        match_created = False
        if opposite_like:
            # keep consistent ordering to avoid duplicate matches
            p1, p2 = sorted([current_profile.id, target_profile.id])
            _, match_created = match.objects.get_or_create(
                profile1_id=p1,
                profile2_id=p2,
            )

        return Response(
            {
                "detail": "Liked profile.",
                "match": match_created,
            },
            status=status.HTTP_200_OK,
        )


class PassProfileView(generics.GenericAPIView):
    """
    POST /api/profiles/<pk>/pass/
    Current user passes on target profile.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        user = request.user
        current_profile, _ = Profile.objects.get_or_create(user=user)

        try:
            target_profile = Profile.objects.get(pk=pk)
        except Profile.DoesNotExist:
            return Response(
                {"detail": "Profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if current_profile.id == target_profile.id:
            return Response(
                {"detail": "You cannot pass on yourself."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        swipe.objects.update_or_create(
            profile=current_profile,
            target_profile=target_profile,
            defaults={"liked": False},
        )

        return Response(
            {"detail": "Passed on profile."},
            status=status.HTTP_200_OK,
        )


class MatchListView(generics.ListAPIView):
    """
    GET /api/matches/
    List all matches for the current user.
    """
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        current_profile, _ = Profile.objects.get_or_create(user=user)
        return match.objects.filter(
            Q(profile1=current_profile) | Q(profile2=current_profile)
        )
    
class MatchMessageListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/matches/<pk>/messages/  -> list messages for this match
    POST /api/matches/<pk>/messages/  -> send a new message in this match
    """
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_match_for_user(self):
        user = self.request.user
        current_profile, _ = Profile.objects.get_or_create(user=user)
        match_id = self.kwargs["pk"]

        m = get_object_or_404(match, pk=match_id)

        # ensure current user is part of this match
        if m.profile1 != current_profile and m.profile2 != current_profile:
            raise PermissionDenied("You are not part of this match.")
        return m, current_profile

    def get_queryset(self):
        m, _ = self.get_match_for_user()
        return m.messages.all()

    def perform_create(self, serializer):
        m, current_profile = self.get_match_for_user()
        serializer.save(match=m, sender=current_profile)
