from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import NotFound

class CarPagination(PageNumberPagination):
	def paginate_queryset(self, queryset, request, view=None):
		try:
			return super().paginate_queryset(queryset, request, view)
		except NotFound:
			return []