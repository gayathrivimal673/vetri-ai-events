from rest_framework import serializers
from .models import Client


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = [
            "id",
            "user",
            "company_name",
            "phone",
            "address",
            "city",
            "created_at",
        ]
        read_only_fields = ["user", "created_at"]