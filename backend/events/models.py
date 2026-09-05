from django.db import models
from users.models import User
from clients.models import Client


class Event(models.Model):

    EVENT_TYPES = [
        ("wedding", "Wedding"),
        ("engagement", "Engagement"),
        ("reception", "Reception"),
        ("birthday", "Birthday"),
        ("corporate", "Corporate"),
        ("conference", "Conference"),
        ("product_launch", "Product Launch"),
        ("baby_shower", "Baby Shower"),
        ("cultural", "Cultural Event"),
        ("private_party", "Private Party"),
    ]

    STATUS_CHOICES = [
        ("planning", "Planning"),
        ("confirmed", "Confirmed"),
        ("ongoing", "Ongoing"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    event_id = models.CharField(max_length=20, unique=True)
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name="events"
    )

    event_type = models.CharField(max_length=30, choices=EVENT_TYPES)
    event_name = models.CharField(max_length=200)

    event_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    venue = models.CharField(max_length=300)
    city = models.CharField(max_length=100, blank=True)

    expected_guests = models.PositiveIntegerField(default=0)
    budget = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    assigned_coordinator = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="coordinated_events"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="planning"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.event_name


class EventFunction(models.Model):

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="functions"
    )

    name = models.CharField(max_length=100)
    function_date = models.DateField()
    venue = models.CharField(max_length=300, blank=True)

    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)

    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.event.event_name} - {self.name}"


class Task(models.Model):

    STATUS_CHOICES = [
        ("not_started", "Not Started"),
        ("in_progress", "In Progress"),
        ("blocked", "Blocked"),
        ("completed", "Completed"),
    ]

    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
        ("urgent", "Urgent"),
    ]

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="tasks"
    )

    function = models.ForeignKey(
        EventFunction,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="tasks"
    )

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    owner = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="event_tasks"
    )

    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default="medium"
    )

    due_date = models.DateField(null=True, blank=True)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="not_started"
    )

    dependency = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
class CrewMember(models.Model):
    ROLE_CHOICES = [
        ("photographer", "Photographer"),
        ("videographer", "Videographer"),
        ("coordinator", "Coordinator"),
        ("decorator", "Decorator"),
        ("makeup", "Makeup Artist"),
        ("dj", "DJ"),
        ("catering", "Catering"),
        ("support", "Support Staff"),
    ]

    STATUS_CHOICES = [
        ("assigned", "Assigned"),
        ("checked_in", "Checked In"),
        ("absent", "Absent"),
    ]

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="crew_members"
    )
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=30, choices=ROLE_CHOICES)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    function = models.ForeignKey(
        EventFunction,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="crew_members"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="assigned"
    )
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.role}"   
    # =========================================================
# EVENT SCHEDULE
# =========================================================

class EventSchedule(models.Model):
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="schedules"
    )

    function = models.ForeignKey(
        EventFunction,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="schedules"
    )

    activity = models.CharField(max_length=200)

    schedule_date = models.DateField()

    venue = models.CharField(max_length=300, blank=True)

    start_time = models.TimeField()

    end_time = models.TimeField()

    assigned_team = models.CharField(
        max_length=200,
        blank=True
    )

    notes = models.TextField(blank=True)

    status = models.CharField(
        max_length=30,
        choices=[
            ("upcoming", "Upcoming"),
            ("in_progress", "In Progress"),
            ("completed", "Completed"),
            ("delayed", "Delayed"),
        ],
        default="upcoming"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.activity} - {self.event.event_name}" 