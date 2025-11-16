from rest_framework import serializers
from .models import Profile, ProfilePhoto, match, message


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["id", "display_name", "bio", "location", "birth_date"]
        read_only_fields = ["id"]

class ProfilePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfilePhoto
        fields = ["id", "image", "order"]

class MatchSerializer(serializers.ModelSerializer):
    other_profile = serializers.SerializerMethodField()

    class Meta:
        model = match
        fields = ["id", "other_profile", "created_at"]
        
    def get_other_profile(self, obj):
        request = self.context.get("request")
        current_profile = getattr(request.user, "profile", None) if request else None
        if current_profile is None:
            return None
        
        other = obj.profile2 if obj.profile1 == current_profile else obj.profile1
        return {
            "id": other.id,
            "username": other.user.username,
            "display_name": other.display_name,
            "location": other.location,
        }

class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(
        source="sender.user.username", read_only=True
    )

    class Meta:
        model = message
        fields = ["id", "sender", "sender_username", "text", "created_at"]
        read_only_fields = ["id", "sender", "sender_username", "created_at"]