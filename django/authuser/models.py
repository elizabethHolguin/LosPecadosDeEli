from django.db import models
from django.contrib.auth.models import User

class Client(models.Model):
    userID = models.OneToOneField(User, primary_key=True, null=False, blank=False, on_delete=models.CASCADE)
    direction = models.CharField(max_length=400)
    city = models.CharField(max_length=100)

    def __str__(self):
        return '{0}'.format(self.userID)

class Rol(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.name

class Employee(models.Model):
    userID = models.OneToOneField(User, primary_key=True, null=False, blank=False, on_delete=models.CASCADE)
    rolID = models.ForeignKey(Rol, on_delete=models.CASCADE)
    dni = models.CharField(max_length=10)
    city = models.CharField(max_length=100)

    def __str__(self):
        return '{0}{1}'.format(self.userID, self.dni)