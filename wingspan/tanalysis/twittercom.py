from dotenv import load_dotenv
from tanalysis.models import Tweet, Query, TopTweetData
import logging
import os
import tweepy
from tweepy import OAuthHandler
from typing import List


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
            keyword (str): query to be used to search for Tweets
            count (int): max results to be returned by Twitter API

        Return:
            List[Tweet]

        """
        all_tweets = []
        try:
            tweet_list = self.api.search_tweets(input.query)
            for tweet in tweet_list:
                this_tweet = Tweet(id=tweet.id, text=tweet.text, username=tweet.user.name, timestamp=tweet.created_at,
                    verified=tweet.user.verified, likes=tweet.favorite_count, retweets=tweet.retweet_count)
                if input.users is not None:
                    if this_tweet.username in input.users:
                        if tweet.retweeted is False:
                            all_tweets.append(this_tweet)
                else:
                    if tweet.retweeted is False:
                        all_tweets.append(this_tweet)
            return all_tweets
        except tweepy.TweepyException as e:
            logging.error('Error:' + str(e))
            return all_tweets

    def getTopTweets(tweets: List[Tweet]):
        top_tweets = []
        for tweet in tweets:
            if tweet.verified is True:
                this_tweet = TopTweetData(id=tweet.id, engagement=(2*tweet.retweets + tweet.likes))
                top_tweets.append(this_tweet)
        return top_tweets


