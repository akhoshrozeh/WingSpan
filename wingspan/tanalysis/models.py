from django.db import models

# Create your models here.

class Tweet(models.Model):
    """
    
    This class is used to store information about a Tweet

    Attributes:
        tid  (CharField): the Twitter ID of the Tweet
        text (CharField): the text of the Tweet
        username (CharField): the username of the Twitter account
        timestamp (DateTimeField): the timestamp of when the Tweet was published
        likes (IntegerField): number of likes
        retweets (IntegerField): number of retweets
        verified (BooleanField): is the Twitter account verified
        score (FloatField): the sentiment score from Google's NLP API
        engagement (IntegerField): the engagement of the Tweet defined as 2 * retweets + likes
        
    """
    tid = models.CharField(max_length=255, null=True)
    text = models.CharField(max_length=280)
    username = models.CharField(max_length=255, null=True)
    timestamp = models.DateTimeField(null=True)
    likes = models.IntegerField(null=True)
    retweets = models.IntegerField(null=True)
    verified = models.BooleanField(null=True)
    score = models.FloatField(null=True)
    engagement = models.IntegerField(null=True)


class User(models.Model):
    username = models.CharField(max_length=15)

class Query(models.Model):
    """

    This class is used to store information about a query made by a user and its results

    Attributes:
        search (CharField): the search query given by the user
        tweets (ManyToManyField(Tweet)): Tweets that were returned by the search from Twitter's API
        user (ForeignKey): User that made the query
    """
    query = models.CharField(max_length=500)
    tweets = models.ManyToManyField(Tweet, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
