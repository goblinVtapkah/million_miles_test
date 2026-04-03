from django.db import models
from django.contrib.postgres.fields import ArrayField

class Car(models.Model):
	images = ArrayField(
		models.TextField(),
	)
	name = models.TextField()
	year = models.TextField()
	mileage = models.IntegerField()
	engine = models.FloatField()
	price = models.FloatField()

	def __str__(self):
		return self.name