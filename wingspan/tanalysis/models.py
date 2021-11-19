from django.db import models

# Create your models here.

class Tweet(models.Model):
    """
    
    This class is used to store information about a Tweet

    Attributes:
        text (CharField): the text of the Tweet
        username (CharField): the username of the Twitter account
        timestamp (DateTimeField): the timestamp of when the Tweet was published
        verified (BooleanField): is the Twitter account verified
        sentiment_score (FloatField): the sentiment score from Google's NLP API
        sentiment_magnitude (FloatField): the sentiment magnitude from Google's NLP API
        
    """
    id = models.IntegerField()
    text = models.CharField(max_length=280)
    username = models.CharField(max_length=255, null=True)
    timestamp = models.DateTimeField()
    likes = models.IntegerField()
    retweets = models.IntegerField()
    verified = models.BooleanField(null=True)


class ScoreData(models.Model):
    timestamp = models.DateTimeField()
    score = models.FloatField()


class TopTweetData(models.Model):
    id = models.IntegerField()
    engagement = models.IntegerField()


class TwitterOutputData(models.Model):
    scores = models.ManyToManyField(ScoreData)
    top_tweets = models.ManyToManyField(TopTweetData)

class Query(models.Model):
    """

    This class is used to store information about a query made by a user and its results

    Attributes:
        search (CharField): the search query given by the user
        tweets (ManyToManyField(Tweet)): Tweets that were returned by the search from Twitter's API
        
    """
    query = models.CharField(max_length=500)
    users = models.ManyToManyField(models.CharField(max_length=15), null=True)
