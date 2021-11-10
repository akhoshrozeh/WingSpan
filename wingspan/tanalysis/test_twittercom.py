from django.test import TestCase
#from django.utils import timezone
#import os
import unittest

from .models import Tweet
from .twittercom import TwitterCom

class TwitterComTestCase(TestCase):
    def setUp(self):
        self.tc = TwitterCom()
        
    def test_no_tweets(self):
        no_tweets = self.tc.findTweets("survivor", 0)
        self.assertEqual(no_tweets, [])
        
    def test_no_query(self):
        no_tweets = self.tc.findTweets("", 10)
        self.assertEqual(no_tweets, [])
        
    def test_find_tweets_count(self):
        count = 10
        tweets = self.tc.findTweets("survivor", count)
        self.assertTrue(len(tweets) <= count)
