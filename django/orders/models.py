from django.db import models

from authuser.models import Client
from products.models import Product

import string, random, datetime

class Order(models.Model):
    orderID = models.SlugField(primary_key=True, unique=True, editable=False, blank=True)
    userID = models.ForeignKey(Client, on_delete=models.CASCADE)
    date = models.DateField(default=datetime.date.today)
    lat = models.FloatField(default=1)
    lon = models.FloatField(default=1)
    status = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        while not self.orderID:
            neworderID = ''.join([
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
                ''.join(str(v) for v in random.sample(string.digits, 2)),
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
            ])
            
            if not Order.objects.filter(pk=neworderID).exists():
                self.orderID = neworderID

        super().save(*args, **kwargs)

    def __str__(self):
        return '{0}-{1}'.format(self.userID, self.date)

class Details(models.Model):
    detailsID = models.SlugField(primary_key=True, unique=True, editable=False, blank=True)
    orderID = models.ForeignKey(Order, on_delete=models.CASCADE)
    productID = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def save(self, *args, **kwargs):
        while not self.detailsID:
            newdetailsID = ''.join([
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
                ''.join(str(v) for v in random.sample(string.digits, 2)),
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
            ])
            
            if not Details.objects.filter(pk=newdetailsID).exists():
                self.detailsID = newdetailsID

        super().save(*args, **kwargs)

    def __str__(self):
        return '{0}-{1}'.format(self.orderID, self.productID)
