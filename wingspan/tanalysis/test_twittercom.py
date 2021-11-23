from django.test import TestCase
#from django.utils import timezone
#import os
import unittest

from .models import Query, User
from .twittercom import TwitterCom

class TwitterComTestCase(TestCase):
    def setUp(self):
        self.tc = TwitterCom()
        
    def test_query(self):
        query = Query(query="survivor")
        tweets = self.tc.findTweets(query)
        self.assertTrue(len(tweets) > 0)
        
    def test_no_query(self):
        query = Query(query="")
        no_tweets = self.tc.findTweets(query)
        self.assertEqual(no_tweets, [])
        
    def test_users(self):
        user = User("taylorswift13")
        query = Query(query="red", users=[user])
        tweets = self.tc.findTweets(query)
        self.assertTrue(len(tweets) > 0)
    
    def test_dups(self):
        query = Query(query="survivor")
        tweets = self.tc.findTweets(query)
        self.assertTrue(len(tweets) == len(set(tweets)))

    def test_dups_with_user(self):
        user = User("taylorswift13")
        query = Query(query="red", users=[user])
        tweets = self.tc.findTweets(query)
        self.assertTrue(len(tweets) == len(set(tweets)))

    def test_top_tweets(self):
        query = Query(query="survivor")
        tweets = self.tc.findTweets(query)
        top_tweets = self.tc.getTopTweets(tweets)
        self.assertTrue(len(top_tweets) > 0)
        self.assertTrue(len(top_tweets) >= len(tweets))
