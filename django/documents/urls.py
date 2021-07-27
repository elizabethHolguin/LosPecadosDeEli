from django.urls import include, path

from . import views

urlpatterns = [
    path('commentary_create/', views.commentary_post, name="create commentary"),
    path('commentary/', views.commentary, name="Commentaries per client"),
]