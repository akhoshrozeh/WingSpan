from django.test import TestCase
from django.utils import timezone
import os
import unittest

from .models import Tweet
from .sentiment import SentimentAnalyzer
from .models import Query, User
from .twittercom import TwitterCom

class SentimentTestCase(TestCase):
    def setUp(self):
        self.tweet = Tweet()
        self.tweet.tid = ""
        self.tweet.text = ""
        self.tweet.username = ""
        self.tweet.timestamp = timezone.now()
        self.tweet.verified = True
        self.tweet.likes = 0
        self.tweet.retweets = 0
        
    # @unittest.skip('Limited number of Google API queries')
    def test_analyze_tweets(self):
        self.assertTrue("GOOGLE_APPLICATION_CREDENTIALS" in os.environ)
        sa = SentimentAnalyzer()
        score_data = sa.analyzeTweets([self.tweet])
        
        for score in score_data:
            self.assertTrue(score["score"] is not None)
            self.assertTrue(score["timestamp"] is not None)

    def test_analyze_tweets_without_credentials(self):
        del os.environ['GOOGLE_APPLICATION_CREDENTIALS']
        self.assertTrue("GOOGLE_APPLICATION_CREDENTIALS" not in os.environ)
        sa = SentimentAnalyzer()
        score_data = sa.analyzeTweets([self.tweet])
        
        for score in score_data:
            self.assertTrue(score["score"] is not None)
            self.assertTrue(score["timestamp"] is not None)


    def test_with_many_tweets(self):
        tc = TwitterCom()
        query = Query(query="survivor")
        query.save()
        tweets = tc.findTweets(query)
        sa = SentimentAnalyzer()
        score_data = sa.analyzeTweets(tweets)
        for score in score_data:
            self.assertTrue(score["score"] <= 100 or score["score"] >= -100)


