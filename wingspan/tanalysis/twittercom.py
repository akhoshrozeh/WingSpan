from tanalysis.models import Tweet
import tweepy
from tweepy import OAuthHandler


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
            API_key = ''
            API_secret = ''
            access_token = ''
            secret_access_token = ''
            self.auth = OAuthHandler(API_key, API_secret)
            self.auth.set_access_token(access_token, secret_access_token)
            self.api = tweepy.API(self.auth)
            print('Authenticated')
        except:
            print("Authentication Error.")

    def findTweets(self, keyword, count):
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
            tweet_list = self.api.search_tweets(keyword, count=count)
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
            print("Error: " + str(e))
