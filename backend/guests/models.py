from django.db import models
from events.models import Event, EventFunction


class Guest(models.Model):
    CATEGORY_CHOICES = [
        ("family", "Family"),
        ("friends", "Friends"),
        ("corporate", "Corporate"),
        ("vip", "VIP"),
        ("other", "Other"),
    ]

    SIDE_CHOICES = [
        ("bride", "Bride"),
        ("groom", "Groom"),
        ("client", "Client"),
        ("other", "Other"),
    ]

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="guests"
    )
    function = models.ForeignKey(
        EventFunction,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="guests"
    )
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default="other"
    )
    side = models.CharField(
        max_length=20,
        choices=SIDE_CHOICES,
        default="other"
    )
    invitation_sent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class RSVP(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("declined", "Declined"),
    ]

    guest = models.OneToOneField(
        Guest,
        on_delete=models.CASCADE,
        related_name="rsvp"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )
    number_of_guests = models.PositiveIntegerField(default=1)
    meal_preference = models.CharField(max_length=100, blank=True)
    message = models.TextField(blank=True)
    responded_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.guest.name} - {self.status}"