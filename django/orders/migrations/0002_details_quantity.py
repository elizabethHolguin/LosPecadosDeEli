# Generated by Django 3.0.5 on 2020-08-22 21:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='details',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
    ]
