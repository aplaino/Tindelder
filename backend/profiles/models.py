from django.conf import settings
from django.db import models

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile"
    )
    display_name = models.CharField(max_length=150)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=100, blank=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Profile of {self.user.username}"
    
class ProfilePhoto(models.Model):
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="photos",
    )
    image = models.ImageField(upload_to="profile_photos/")
    order = models.PositiveSmallIntegerField(default=0)  # 0–4

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"Photo {self.order} of {self.profile.user.username}"
    
class swipe(models.Model):
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="swipes",
    )
    target_profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="swiped_by",
    )
    liked = models.BooleanField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("profile", "target_profile")

    def __str__(self):
        action = "liked" if self.liked else "disliked"
        return f"{self.profile.user.username} {action} {self.target_profile.user.username}"
    
class match(models.Model):
    profile1 = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="matches_as_profile1",
    )
    profile2 = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="matches_as_profile2",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("profile1", "profile2")

    def __str__(self):
        return f"Match between {self.profile1.user.username} and {self.profile2.user.username}"

class message(models.Model):
    match = models.ForeignKey(
        match,
        on_delete=models.CASCADE,
        related_name="messages",
    )
    sender = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="sent_messages",
    )
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"Message from {self.sender.user.username} in match {self.match.id}"
