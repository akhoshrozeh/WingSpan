from django.test import TestCase
from django.utils import timezone
import os
import unittest

from .models import Tweet
from .sentiment import SentimentAnalyzer

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
        # self.assertTrue("GOOGLE_APPLICATION_CREDENTIALS" in os.environ)
        sa = SentimentAnalyzer()
        score_data = sa.analyzeTweets([self.tweet])
        
        for score in score_data:
            self.assertTrue(score["score"] is not None)
            self.assertTrue(score["timestamp"] is not None)

    def test_analyze_tweets_without_credentials(self):
        del os.environ['GOOGLE_APPLICATION_CREDENTIALS']
        sa = SentimentAnalyzer()
        score_data = sa.analyzeTweets([self.tweet])
        
        for score in score_data:
            self.assertTrue(score["score"] is not None)
            self.assertTrue(score["timestamp"] is not None)
