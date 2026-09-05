from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import (
    Event,
    EventFunction,
    Task,
    CrewMember,
    EventSchedule,
)

from .serializers import (
    EventSerializer,
    EventFunctionSerializer,
    TaskSerializer,
    CrewMemberSerializer,
    EventScheduleSerializer,
)


# =========================================================
# EVENT API
# =========================================================

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by("-created_at")
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user

        # Logged-in user's client profile
        client = getattr(user, "client_profile", None)

        # Create client automatically if profile doesn't exist
        if client is None:
            from clients.models import Client

            client = Client.objects.create(
                user=user,
                phone=user.phone or "0000000000",
            )

        # Generate Event ID
        event_number = Event.objects.count() + 1
        event_id = f"EVT-{event_number:04d}"

        serializer.save(
            client=client,
            event_id=event_id,
        )


# =========================================================
# EVENT FUNCTION API
# =========================================================

class EventFunctionViewSet(viewsets.ModelViewSet):
    queryset = EventFunction.objects.all().order_by("function_date")
    serializer_class = EventFunctionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = EventFunction.objects.all().order_by("function_date")

        event_id = self.request.query_params.get("event")

        if event_id:
            queryset = queryset.filter(event_id=event_id)

        return queryset


# =========================================================
# TASK API
# =========================================================

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by("due_date")
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Task.objects.all().order_by("due_date")

        event_id = self.request.query_params.get("event")

        if event_id:
            queryset = queryset.filter(event_id=event_id)

        status = self.request.query_params.get("status")

        if status:
            queryset = queryset.filter(status=status)

        priority = self.request.query_params.get("priority")

        if priority:
            queryset = queryset.filter(priority=priority)

        return queryset


# =========================================================
# CREW API
# =========================================================

class CrewMemberViewSet(viewsets.ModelViewSet):
    queryset = CrewMember.objects.all().order_by("-created_at")
    serializer_class = CrewMemberSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = CrewMember.objects.all().order_by("-created_at")

        event_id = self.request.query_params.get("event")

        if event_id:
            queryset = queryset.filter(event_id=event_id)

        role = self.request.query_params.get("role")

        if role:
            queryset = queryset.filter(role=role)

        status = self.request.query_params.get("status")

        if status:
            queryset = queryset.filter(status=status)

        return queryset


# =========================================================
# EVENT SCHEDULE API
# =========================================================

class EventScheduleViewSet(viewsets.ModelViewSet):
    queryset = EventSchedule.objects.all().order_by(
        "schedule_date",
        "start_time",
    )
    serializer_class = EventScheduleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = EventSchedule.objects.all().order_by(
            "schedule_date",
            "start_time",
        )

        event_id = self.request.query_params.get("event")

        if event_id:
            queryset = queryset.filter(event_id=event_id)

        status = self.request.query_params.get("status")

        if status:
            queryset = queryset.filter(status=status)

        return queryset