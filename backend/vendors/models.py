from django.db import models
from events.models import Event


class Vendor(models.Model):

    CATEGORY_CHOICES = [
        ("photography", "Photography"),
        ("videography", "Videography"),
        ("catering", "Catering"),
        ("decoration", "Decoration"),
        ("makeup", "Makeup"),
        ("mehendi", "Mehendi"),
        ("music", "Music"),
        ("dj", "DJ"),
        ("entertainment", "Entertainment"),
        ("transportation", "Transportation"),
        ("venue", "Venue"),
        ("printing", "Printing"),
        ("equipment", "Event Equipment"),
    ]

    AVAILABILITY_CHOICES = [
        ("available", "Available"),
        ("booked", "Booked"),
        ("confirmed", "Confirmed"),
        ("unavailable", "Unavailable"),
    ]

    name = models.CharField(max_length=200)

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    contact = models.CharField(max_length=30)

    email = models.EmailField(blank=True)

    location = models.CharField(
        max_length=200,
        blank=True
    )

    services = models.TextField(blank=True)

    pricing = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    availability = models.CharField(
        max_length=20,
        choices=AVAILABILITY_CHOICES,
        default="available"
    )

    rating = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.name


class VendorAssignment(models.Model):

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ]

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="vendor_assignments"
    )

    vendor = models.ForeignKey(
        Vendor,
        on_delete=models.CASCADE,
        related_name="assignments"
    )

    service_category = models.CharField(
        max_length=50,
        blank=True
    )

    assigned_price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    assigned_date = models.DateField(
        auto_now_add=True
    )

    notes = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.event.event_name} - {self.vendor.name}"