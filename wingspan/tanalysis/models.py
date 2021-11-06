from django.db import models

# Create your models here.

class Tweet(models.Model):
    text = models.CharField(max_length=280)
    username = models.CharField(max_length=255, null=True)
    timestamp = models.DateTimeField()
    verified = models.BooleanField(null=True)
    sentiment_score = models.FloatField(null=True)
    sentiment_magnitude = models.FloatField(null=True)


class Query(models.Model):
    search = models.CharField(max_length=500)
    tweets = models.ManyToManyField(Tweet)
