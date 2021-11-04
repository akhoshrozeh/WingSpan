from .models import Tweet
import tweepy
from tweepy import OAuthHandler

class TwitterCom():
    def __init__(self):
        API_key = 'U1g02y8NTK3BOhFE2OAAc3k6h'
        API_secret = '8QXj4Y0tE3PNtsMQVTrh3BV1qESTpWgNHRKuxHRPnPVJVjzeS7'
        access_token = '1370712710-BPENePfXL81hsTz9Jtwoof5NuC8MK34vQRzd9la'
        secret_access_token = 'INkIGhwH5cI3W2c1oGgcvUmzO3gq7x4HVDonz3xICa8MO'
        try:
            self.auth = OAuthHandler(API_key, API_secret)
            self.auth.set_access_token(access_token, secret_access_token)
            self.api = tweepy.API(self.auth)
            print('Authenticated')
        except:
            print("Authentication Error.")

    def search_tweets(self, keyword, count):
        all_tweets = []
        try:
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
            print("Error: " + e)