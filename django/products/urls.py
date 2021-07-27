from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('categories/', views.categories, name="categories"),
    path('create_category/', views.categories_post, name="create categories"),
    path('products/', views.products, name="products"),
    path('create_product/', views.products_post, name="create products"),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]