from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Budget, Expense, Payment
from .serializers import (
    BudgetSerializer,
    ExpenseSerializer,
    PaymentSerializer,
)


class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all().order_by("-created_at")
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Budget.objects.all().order_by("-created_at")

        event_id = self.request.query_params.get("event")

        if event_id:
            queryset = queryset.filter(event_id=event_id)

        return queryset


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all().order_by("-created_at")
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Expense.objects.all().order_by("-created_at")

        event_id = self.request.query_params.get("event")
        category = self.request.query_params.get("category")
        status = self.request.query_params.get("status")

        if event_id:
            queryset = queryset.filter(event_id=event_id)

        if category:
            queryset = queryset.filter(category=category)

        if status:
            queryset = queryset.filter(status=status)

        return queryset


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all().order_by("-created_at")
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Payment.objects.all().order_by("-created_at")

        event_id = self.request.query_params.get("event")
        status = self.request.query_params.get("status")

        if event_id:
            queryset = queryset.filter(event_id=event_id)

        if status:
            queryset = queryset.filter(status=status)

        return queryset