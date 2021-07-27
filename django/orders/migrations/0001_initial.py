# Generated by Django 3.0.5 on 2020-08-22 17:34

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authuser', '0004_auto_20200819_2016'),
        ('products', '0004_auto_20200817_1614'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('orderID', models.SlugField(blank=True, editable=False, primary_key=True, serialize=False, unique=True)),
                ('date', models.DateField(default=datetime.date.today)),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authuser.Client')),
            ],
        ),
        migrations.CreateModel(
            name='Details',
            fields=[
                ('detailsID', models.SlugField(blank=True, editable=False, primary_key=True, serialize=False, unique=True)),
                ('orderID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.Order')),
                ('productID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.Product')),
            ],
        ),
    ]
