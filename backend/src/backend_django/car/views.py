from rest_framework import generics
from rest_framework.response import Response
from .models import Car
from .serializers import CarSerializer
from .pagination import CarPagination

class CarListCreateView(generics.ListCreateAPIView):
	queryset = Car.objects.all()
	serializer_class = CarSerializer
	pagination_class = CarPagination

	def list(self, request, *args, **kwargs):
		queryset = self.get_queryset()
		page = self.paginate_queryset(queryset)
		serializer = self.get_serializer(page, many=True)
		
		return Response({
			"cars": serializer.data,
			"cars_count": queryset.count()
		})

class CarDetailView(generics.RetrieveAPIView):
		queryset = Car.objects.all()
		serializer_class = CarSerializer
		lookup_field = 'id'