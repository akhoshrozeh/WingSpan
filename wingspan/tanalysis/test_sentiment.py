from django.test import TestCase
from django.utils import timezone
import os
import unittest

from .models import Tweet
from .sentiment import SentimentAnalyzer

class SentimentTestCase(TestCase):
    def setUp(self):
        self.tweet = Tweet()
        self.tweet.text = ""
        self.tweet.username = ""
        self.tweet.timestamp = timezone.now()
        self.tweet.verified = True
        self.tweet.sentiment_score = None
        self.tweet.sentiment_magnitude = None
        
    # @unittest.skip('Limited number of Google API queries')
    def test_analyze_tweets(self):
        # self.assertTrue("GOOGLE_APPLICATION_CREDENTIALS" in os.environ)
        sa = SentimentAnalyzer()
        sa.analyzeTweets([self.tweet])
        
        self.assertTrue(self.tweet.sentiment_score is not None)
        self.assertTrue(self.tweet.sentiment_magnitude is not None)
