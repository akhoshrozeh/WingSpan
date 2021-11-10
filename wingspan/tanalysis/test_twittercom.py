from django.test import TestCase
from django.utils import timezone
import os
import unittest

from .models import Tweet
from .twittercom import TwitterCom

class TwitterComTestCase(TestCase):
    def setUp(self):
        self.tc = TwitterCom()
        
    def test_no_tweets(self):
        no_tweets = tc.findTweets("", 0)
        self.assertEqual(no_tweets, [])
        
    def test_find_tweets(self):
    	tweets = tc.findTweets("survivor", 10)
    	self.assertEqual(len(tweets), 10)
