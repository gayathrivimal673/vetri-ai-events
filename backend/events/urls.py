from rest_framework.routers import DefaultRouter
from .views import EventViewSet, EventFunctionViewSet, TaskViewSet,CrewMemberViewSet,   EventScheduleViewSet


router = DefaultRouter()

router.register("events", EventViewSet, basename="events")
router.register("functions", EventFunctionViewSet, basename="functions")
router.register("tasks", TaskViewSet, basename="tasks")
router.register("crew", CrewMemberViewSet)
router.register("schedules", EventScheduleViewSet)

urlpatterns = router.urls