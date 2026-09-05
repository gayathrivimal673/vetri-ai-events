from django.contrib import admin
from .models import Vendor, VendorAssignment

admin.site.register(Vendor)
admin.site.register(VendorAssignment)