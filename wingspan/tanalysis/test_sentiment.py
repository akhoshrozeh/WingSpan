from django.test import TestCase
from django.utils import timezone
import os
import unittest

from .models import Tweet
from .sentiment import SentimentAnalyzer

class SentimentTestCase(TestCase):
    def setUp(self):
        tweet = Tweet()
        tweet.text = ""
        tweet.username = ""
        tweet.timestamp = timezone.now()
        tweet.verified = True
        tweet.sentiment_score = None
        tweet.sentiment_magnitude = None
        
    @unittest.skip('Limited number of Google API queries')
    def test_analyze_tweets(self):
        self.assertTrue("GOOGLE_APPLICATION_CREDENTIALS" in os.environ)
        sa = SentimentAnalyzer()
        sa.analyzeTweets([tweet])
        
        self.assertTrue(tweet.sentiment_score is not None)
        self.assertTrue(tweet.sentiment_magnitude is not None)
