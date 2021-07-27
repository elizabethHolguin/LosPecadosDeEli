from django.urls import include, path

from . import views

urlpatterns = [
    path('create/', views.order_post, name="Create order"),
    path('details/create/', views.details_post, name="Detail order"),
    path('date/<pk>', views.details_per_date, name="Detail for date"),
    path('month/', views.details_per_month, name="Detail for month"),
    path('order_week/', views.orders_per_week, name="Orders for week"),
    path('pending/', views.orders_pending, name="Orders pending"),
    path('changepending/<pk>', views.orders_change_state, name="Change order pending")
]