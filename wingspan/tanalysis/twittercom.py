from .models import Tweet
import tweepy
from tweepy import OAuthHandler
import logging
import json

"""
TwitterCom() is a class that aids in forming a list of tweets that will be sent over to
analyze the sentiment of a topic.
"""
class TwitterCom():
    """
    On __init__, the class prepares the api information and authenticates based on the token.
    """
    def __init__(self):
        try:
            with open('twittercreds.json', 'r') as file_to_read:
                json_data = json.load(file_to_read)
            API_key = json_data["API_KEY"]
            API_secret = json_data["API_SECRET"]
            access_token = json_data["ACCESS_TOKEN"]
            secret_access_token = json_data["SECRET_ACCESS_TOKEN"]
            self.auth = OAuthHandler(API_key, API_secret)
            self.auth.set_access_token(access_token, secret_access_token)
            self.api = tweepy.API(self.auth)
            logging.info('Authenticated')
        except:
            logging.error("Authentication Error.")

    """
    When a query has been made, findTweets() will run a search to Twitter's API based on the query.
    It returns a response from a search by keyword and number of tweets requested, and from each 
    tweet in that response object, the necessary information to build Tweet objects are stored.
    It stores the results from the search in a list of Tweet objects.
    """
    def findTweets(self, keyword, count):
        all_tweets = []
        try:
            if count == 0:
                return all_tweets
            tweet_list = self.api.search_tweets(keyword, max_results=count)
            for tweet in tweet_list:
                this_tweet = Tweet(text=tweet.text, username=tweet.user.name, timestamp=tweet.created_at,
                    verified=tweet.user.verified)
                if tweet.retweet_count > 0:
                    if tweet.text not in all_tweets:
                        all_tweets.append(this_tweet)
                else:
                    all_tweets.append(this_tweet)
            return all_tweets
        except tweepy.TweepyException as e:
            logging.error('Error:' + e)
            return all_tweets