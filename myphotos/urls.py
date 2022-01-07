from django.urls import path
from . import views

urlpatterns = [
    path('', views.gallery,name='gallery'),
    path('add/', views.add_photo,name='add'),
    path('search_photos/',views.search_photos,name='search_photos'),
    path('filter_photos/',views.filter_photos,name='filter_photos')

]
