from django.db import models

import string, random

class Category(models.Model):
    categoryID = models.SlugField(primary_key=True, unique=True, editable=False, blank=True)
    categoryname = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        while not self.categoryID:
            newcategoryID = ''.join([
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
                ''.join(str(v) for v in random.sample(string.digits, 2)),
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
            ])
            
            if not Category.objects.filter(pk=newcategoryID).exists():
                self.categoryID = newcategoryID

        super().save(*args, **kwargs)

    def __str__(self):
        return self.categoryname

class Product(models.Model):
    productID = models.SlugField(primary_key=True, unique=True, editable=False, blank=True)
    categoryID = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=60)

    def save(self, *args, **kwargs):
        while not self.productID:
            newproductID = ''.join([
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
                ''.join(str(v) for v in random.sample(string.digits, 2)),
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
            ])
            
            if not Product.objects.filter(pk=newproductID).exists():
                self.productID = newproductID

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

"""
class Category(models.Model):
    categoryID = models.SlugField(primary_key=True, unique=True, editable=False, blank=True)
    categoryname = models.CharField(max_length=60)
    description = models.CharField(max_length=200)

    def save(self, *args, **kwargs):
        while not self.categoryID:
            newcategoryID = ''.join([
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
                ''.join(str(v) for v in random.sample(string.digits, 2)),
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
            ])
            
            if not Category.objects.filter(pk=newcategoryID).exists():
                self.categoryID = newcategoryID

        super().save(*args, **kwargs)

    def __str__(self):
        return self.categoryname

class Product(models.Model):
    productID = models.SlugField(primary_key=True, unique=True, editable=False, blank=True)
    categoryID = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    description = models.CharField(max_length=200)
    unitPrice = models.FloatField()
    url_image = models.CharField(max_length=250)

    def save(self, *args, **kwargs):
        while not self.productID:
            newproductID = ''.join([
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
                ''.join(str(v) for v in random.sample(string.digits, 2)),
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
            ])
            
            if not Product.objects.filter(pk=newproductID).exists():
                self.productID = newproductID

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
"""