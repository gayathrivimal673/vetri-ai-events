from rest_framework import serializers
from .models import Budget, Expense, Payment


class BudgetSerializer(serializers.ModelSerializer):
    event_name = serializers.CharField(
        source="event.event_name",
        read_only=True
    )

    class Meta:
        model = Budget
        fields = [
            "id",
            "event",
            "event_name",
            "total_budget",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]


class ExpenseSerializer(serializers.ModelSerializer):
    event_name = serializers.CharField(
        source="event.event_name",
        read_only=True
    )

    class Meta:
        model = Expense
        fields = [
            "id",
            "event",
            "event_name",
            "category",
            "title",
            "amount",
            "status",
            "due_date",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]


class PaymentSerializer(serializers.ModelSerializer):
    event_name = serializers.CharField(
        source="event.event_name",
        read_only=True
    )
    expense_title = serializers.CharField(
        source="expense.title",
        read_only=True
    )

    class Meta:
        model = Payment
        fields = [
            "id",
            "event",
            "event_name",
            "expense",
            "expense_title",
            "description",
            "amount",
            "payment_date",
            "status",
            "transaction_id",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]