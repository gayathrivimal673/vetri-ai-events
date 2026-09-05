from rest_framework import serializers
from .models import Vendor, VendorAssignment


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = "__all__"


class VendorAssignmentSerializer(serializers.ModelSerializer):
    vendor_name = serializers.CharField(
        source="vendor.name",
        read_only=True
    )

    event_name = serializers.CharField(
        source="event.event_name",
        read_only=True
    )

    class Meta:
        model = VendorAssignment
        fields = [
            "id",
            "event",
            "event_name",
            "vendor",
            "vendor_name",
            "service_category",
            "assigned_price",
            "status",
            "assigned_date",
            "notes",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "assigned_date",
            "created_at",
            "updated_at",
        ]