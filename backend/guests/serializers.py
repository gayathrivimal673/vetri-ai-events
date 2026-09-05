from rest_framework import serializers
from .models import Guest, RSVP


class GuestSerializer(serializers.ModelSerializer):
    rsvp_status = serializers.SerializerMethodField()

    class Meta:
        model = Guest
        fields = [
            "id",
            "event",
            "function",
            "name",
            "phone",
            "email",
            "category",
            "side",
            "invitation_sent",
            "rsvp_status",
            "created_at",
        ]

    def get_rsvp_status(self, obj):
        if hasattr(obj, "rsvp"):
            return obj.rsvp.status
        return "pending"


class RSVPSerializer(serializers.ModelSerializer):
    class Meta:
        model = RSVP
        fields = "__all__"