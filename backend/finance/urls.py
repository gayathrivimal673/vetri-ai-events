from rest_framework.routers import DefaultRouter
from .views import BudgetViewSet, ExpenseViewSet, PaymentViewSet

router = DefaultRouter()

router.register("budgets", BudgetViewSet, basename="budgets")
router.register("expenses", ExpenseViewSet, basename="expenses")
router.register("payments", PaymentViewSet, basename="payments")

urlpatterns = router.urls