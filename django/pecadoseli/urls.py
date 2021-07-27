from django.urls import path, include

from django.contrib import admin

admin.autodiscover()

import products.views

# Learn more here: https://docs.djangoproject.com/en/2.1/topics/http/urls/

urlpatterns = [
    path("", products.views.index, name="index"),
    path('api/v1/', include('authuser.urls')),
    path('api/v1/', include('products.urls')),
    path('api/v1/', include('documents.urls')),
    path('api/v1/order/', include('orders.urls')),
    path("admin/", admin.site.urls),
    path("api/v1/sendinfo/",include('sendinfo.urls')),
]
