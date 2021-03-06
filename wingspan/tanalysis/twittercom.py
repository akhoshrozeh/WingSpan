from dotenv import load_dotenv
from tanalysis.models import Tweet, Query
import logging
import os
import tweepy
from tweepy import OAuthHandler
from typing import List
import datetime


class TwitterCom():
    """

    TwitterCom() is a class that aids in forming a list of tweets that will be sent over to
    analyze the sentiment of a topic.

    Attributes:
        auth (Tweepy.OAuthHandler): authentication to be used with Tweepy API
        api (Tweepy.API): used to query Tweepy API

    """
    def __init__(self):
        """

        On __init__, the class prepares the api information and authenticates based on the token.
        
        """
        try:
            load_dotenv()
            API_key = os.environ.get("API_KEY")
            API_secret = os.environ.get("API_SECRET")
            access_token = os.environ.get("ACCESS_TOKEN")
            secret_access_token = os.environ.get("SECRET_ACCESS_TOKEN")
            self.auth = OAuthHandler(API_key, API_secret)
            self.auth.set_access_token(access_token, secret_access_token)
            self.api = tweepy.API(self.auth)
            logging.info('Authenticated')
        except:
            logging.error("Authentication Error.")

    def findTweets(self, input: Query):
        """

        When a query has been made, findTweets() will run a search to Twitter's API based on the query.
        It returns a response from a search by keyword and number of tweets requested, and from each 
        tweet in that response object, the necessary information to build Tweet objects are stored.
        It stores the results from the search in a list of Tweet objects.
        
        Args:
            input (Query): A Query object that contains the keyword and usernames to be used to search for Tweets

        Return:
            List[Tweet]

        """
        all_tweets = []
        if input.query == "":
            return all_tweets
        tomorrow = datetime.datetime.now().date() + datetime.timedelta(days=1)
        latest_id = 0
        try:
            for i in range(6, -1, -1):
                tweet_list = self.api.search_tweets(input.query + ' -filter:retweets', lang="en", count=100, since_id=latest_id, until=str(tomorrow - datetime.timedelta(days=i)), tweet_mode='extended')
                for tweet in tweet_list:
                    this_tweet = Tweet(tid=tweet.id_str, text=tweet.full_text, username=tweet.user.name, timestamp=tweet.created_at,
                        verified=tweet.user.verified, likes=tweet.favorite_count, retweets=tweet.retweet_count)
                    this_tweet.save()
                    latest_id = max(int(tweet.id_str), latest_id)
                    retweeted = tweet.full_text.startswith('RT @')
                    if input.users.exists():
                        if this_tweet.username in input.users.all():
                            if not retweeted and not tweet.is_quote_status:
                                all_tweets.append(this_tweet)
                    else:
                        if not retweeted and not tweet.is_quote_status:
                            all_tweets.append(this_tweet)
            return all_tweets
        except tweepy.TweepyException as e:
            logging.error('Error:' + str(e))
            return all_tweets
    
    
    def getTopTweets(self, tweets: List[Tweet]):
        """
        Returns a list of dictionaries with the "engagement" information about all of the inputted Tweets that were sent by verified users.
        This information is used by the frontend in the "Top Tweets" section.

        Args:
            tweets (List[Tweet]): A list of Tweets to search through to find Tweets by verified users

        Return:
            List[Dict]: A list of dictionaries corresponding to each Tweet by a verified user with the following structure: 
            {"tid": tweet.id, "engagement": (2*tweet.retweets + tweet.likes)}

        """
        top_tweets = []
        for tweet in tweets:
            if tweet.verified:
                this_tweet = {"tid":tweet.tid, "engagement":(2*tweet.retweets + tweet.likes)}
                top_tweets.append(this_tweet)
        return top_tweets


