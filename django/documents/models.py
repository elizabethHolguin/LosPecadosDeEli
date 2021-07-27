from django.db import models

import string, random, datetime

from authuser.models import Client
from authuser.models import Employee

class News(models.Model):
    newsID = models.SlugField(primary_key=True, unique=True, editable=False, blank=True)
    userID = models.ForeignKey(Employee, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        while not self.newsID:
            newnewsID = ''.join([
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
                ''.join(str(v) for v in random.sample(string.digits, 2)),
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
            ])
            
            if not News.objects.filter(pk=newnewsID).exists():
                self.newsID = newnewsID

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class Commentary(models.Model):
    commentaryID = models.SlugField(primary_key=True, unique=True, editable=False, blank=True)
    userID = models.ForeignKey(Client, on_delete=models.CASCADE)
    creation_date = models.DateField(default=datetime.date.today)

    def save(self, *args, **kwargs):
        while not self.commentaryID:
            newcommentaryID = ''.join([
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
                ''.join(str(v) for v in random.sample(string.digits, 2)),
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
            ])
            
            if not Commentary.objects.filter(pk=newcommentaryID).exists():
                self.commentaryID = newcommentaryID

        super().save(*args, **kwargs)

    def __str__(self):
        return '{0} {1}'.format(self.userID, self.creation_date)