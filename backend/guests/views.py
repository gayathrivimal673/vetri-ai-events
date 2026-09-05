from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Guest, RSVP
from .serializers import GuestSerializer, RSVPSerializer


class GuestViewSet(viewsets.ModelViewSet):
    queryset = Guest.objects.all().order_by("-created_at")
    serializer_class = GuestSerializer
    permission_classes = [IsAuthenticated]


class RSVPViewSet(viewsets.ModelViewSet):
    queryset = RSVP.objects.all().order_by("-responded_at")
    serializer_class = RSVPSerializer
    permission_classes = [IsAuthenticated]