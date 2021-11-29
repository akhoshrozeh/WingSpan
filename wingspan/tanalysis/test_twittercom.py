from django.test import TestCase
#from django.utils import timezone
import os
import unittest

from .models import Query, User
from .twittercom import TwitterCom


class TwitterComTestCase(TestCase):
    def setUp(self):
        self.tc = TwitterCom()
        
    def test_query(self):
        query = Query(query="survivor")
        query.save()
        tweets = self.tc.findTweets(query)
        self.assertTrue(len(tweets) >= 0)

    def test_no_query(self):
        query = Query(query="")
        query.save()
        no_tweets = self.tc.findTweets(query)
        self.assertEqual(no_tweets, [])

    def test_users(self):
        user = User(username="taylorswift13")
        user.save()
        query = Query(query="red")
        query.save()
        query.users.add(user)
        tweets = self.tc.findTweets(query)
        self.assertTrue(len(tweets) >= 0)
    
    def test_dups(self):
        query = Query(query="survivor")
        query.save()
        tweets = self.tc.findTweets(query)
        self.assertTrue(len(tweets) == len(set(tweets)))

    def test_dups_with_user(self):
        user = User(username="taylorswift13")
        user.save()
        query = Query(query="red")
        query.save()
        query.users.add(user)
        tweets = self.tc.findTweets(query)
        self.assertTrue(len(tweets) == len(set(tweets)))

    def test_top_tweets(self):
        query = Query(query="survivor")
        query.save()
        tweets = self.tc.findTweets(query)
        top_tweets = self.tc.getTopTweets(tweets)

        verified_count = 0
        for i in tweets:
            if i.verified == True:
                verified_count += 1

        tids = []
        for i in top_tweets:
            tids.append(i['tid'])

        self.assertTrue(len(top_tweets) >= 0)
        self.assertTrue(len(top_tweets) <= len(tweets))
        self.assertTrue(verified_count == len(top_tweets))
        self.assertTrue(len(top_tweets) == len(set(tids)))
 