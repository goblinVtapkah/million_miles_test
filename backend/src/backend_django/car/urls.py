from django.urls import path
from .views import CarListCreateView, CarDetailView

urlpatterns = [
    path('car/', CarListCreateView.as_view(), name='car-list'),
	path('car/<int:id>/', CarDetailView.as_view(), name='car-detail'),
]