from django.contrib import admin

from .models import Commentary
from .models import News

admin.site.register(Commentary)
admin.site.register(News)