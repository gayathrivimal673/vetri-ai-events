from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Vendor, VendorAssignment
from .serializers import VendorSerializer, VendorAssignmentSerializer


class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all().order_by("-created_at")
    serializer_class = VendorSerializer
    permission_classes = [IsAuthenticated]


class VendorAssignmentViewSet(viewsets.ModelViewSet):
    queryset = VendorAssignment.objects.all().order_by("-assigned_date")
    serializer_class = VendorAssignmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = VendorAssignment.objects.all().order_by("-assigned_date")

        event_id = self.request.query_params.get("event")
        vendor_id = self.request.query_params.get("vendor")
        status = self.request.query_params.get("status")

        if event_id:
            queryset = queryset.filter(event_id=event_id)

        if vendor_id:
            queryset = queryset.filter(vendor_id=vendor_id)

        if status:
            queryset = queryset.filter(status=status)

        return queryset