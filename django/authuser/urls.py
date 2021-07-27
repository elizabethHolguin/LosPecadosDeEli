from django.urls import include, path

from authuser import views

urlpatterns = [
    path('user_create/', views.user_create, name="User create"),
    path('user/', views.user_data, name="User update"),
    path('client_create/', views.client_create, name="Client create"),
    path('client/', views.client_data, name="Client update"),
    path('api_generate_token/', views.CustomAuthToken.as_view(), name="Generate token"),
]