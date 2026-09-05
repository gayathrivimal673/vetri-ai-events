from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Budget, Expense, Payment

admin.site.register(Budget)
admin.site.register(Expense)
admin.site.register(Payment)