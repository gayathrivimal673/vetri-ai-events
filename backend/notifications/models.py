from django.db import models
from users.models import User
from events.models import Event


class Notification(models.Model):
    TYPE_CHOICES = [
        ("task", "Task"),
        ("payment", "Payment"),
        ("vendor", "Vendor"),
        ("guest", "Guest"),
        ("event", "Event"),
        ("schedule", "Schedule"),
        ("system", "System"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notifications"
    )
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="notifications"
    )
    title = models.CharField(max_length=200)
    message = models.TextField()
    notification_type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        default="system"
    )
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title