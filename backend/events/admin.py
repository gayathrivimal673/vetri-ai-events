from django.contrib import admin
from .models import Event, EventFunction, Task

admin.site.register(Event)
admin.site.register(EventFunction)
admin.site.register(Task)