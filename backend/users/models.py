from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("coordinator", "Coordinator"),
        ("client", "Client"),
        ("vendor", "Vendor"),
        ("crew", "Crew"),
        ("guest", "Guest"),
        ("photographer", "Photographer"),
    ]

    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="client"
    )
    phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.username