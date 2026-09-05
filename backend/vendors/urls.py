

from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import VendorViewSet, VendorAssignmentViewSet


router = DefaultRouter()

router.register("vendors", VendorViewSet, basename="vendor")
router.register(
    "vendor-assignments",
    VendorAssignmentViewSet,
    basename="vendor-assignment"
)

urlpatterns = router.urls