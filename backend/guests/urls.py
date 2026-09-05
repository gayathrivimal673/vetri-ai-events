from rest_framework.routers import DefaultRouter
from .views import GuestViewSet, RSVPViewSet

router = DefaultRouter()

router.register("guests", GuestViewSet, basename="guests")
router.register("rsvps", RSVPViewSet, basename="rsvps")

urlpatterns = router.urls