from rest_framework import serializers

from .models import (
    Event,
    EventFunction,
    Task,
    CrewMember,
    EventSchedule,
)


class EventFunctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventFunction
        fields = "__all__"


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"


class CrewMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrewMember
        fields = "__all__"


class EventScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventSchedule
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]


class EventSerializer(serializers.ModelSerializer):

    functions = EventFunctionSerializer(
        many=True,
        read_only=True
    )

    tasks = TaskSerializer(
        many=True,
        read_only=True
    )

    crew_members = CrewMemberSerializer(
        many=True,
        read_only=True
    )

    schedules = EventScheduleSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Event

        fields = [
            "id",
            "event_id",
            "client",
            "event_type",
            "event_name",
            "event_date",
            "start_time",
            "end_time",
            "venue",
            "city",
            "expected_guests",
            "budget",
            "assigned_coordinator",
            "status",
            "functions",
            "tasks",
            "crew_members",
            "schedules",
            "created_at",
            "updated_at",
        ]

        # These are created automatically by the backend
        read_only_fields = [
            "id",
            "event_id",
            "client",
            "created_at",
            "updated_at",
        ]