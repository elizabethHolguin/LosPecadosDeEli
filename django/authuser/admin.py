from django.contrib import admin

from .models import Client
from .models import Employee
from .models import Rol

admin.site.register(Client)
admin.site.register(Rol)
admin.site.register(Employee)