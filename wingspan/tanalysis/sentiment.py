from google.cloud import language_v1
from tanalysis.models import Tweet
from typing import List
import os
import random
import datetime
import string

class SentimentAnalyzer():
    """

    This class is used to perform sentiment analysis on Tweet objects

    Attributes:
        analyzer: A google.cloud LanguageServiceClient instance
        type: A string that indicates the type of text to be given to the analyzer

    """
    def __init__(self, text_type=language_v1.Document.Type.PLAIN_TEXT):
        """

        Initializes a SentimentAnalyzer with text_type

        Args:
            text_type (str): the type of text to be given to the analyzer.
            Defaults to google.cloud.language_v1.Document.Type.PLAIN_TEXT

        """
        if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
            self.analyzer = language_v1.LanguageServiceClient()
        else:
            self.analyzer = None
        self.type = text_type

    def analyzeTweets(self, tweets: List[Tweet]):
        """

        Iterates through a given list of Tweet objects, uses the analyzer to perform sentiment analysis on the text,
        and updates the sentiment_score of each Tweet. If the Google API credentials are not set with an environment 
        variable, the Tweets will be given random values. Finally, this method returns a list of dictionaries with 
        the values the frontend needs to construct a graph of the sentiment of the given Tweets.

        Args:
            tweets (List[Tweet]): list of tweets to analyze

        Return:
            List[Dict]: a list of dictionaries corresponding to each Tweet with the following structure: {'score': sentiment_score, 'timestamp': timestamp} 
            
        """
        all_score_data = []
        if self.analyzer:
            document_text = ''
            tweets_by_date = {}
            for tweet in tweets:
                date = tweet.timestamp.date()
                if date not in tweets_by_date:
                    tweets_by_date[date] = ''
                tweets_by_date[date] += tweet.text

            for date, document_text in tweets_by_date.items():
                document = language_v1.Document(content=document_text, type_=self.type)
                response = self.analyzer.analyze_sentiment(request={'document': document})
                for index, sentence in enumerate(response.sentences):
                    if index >= len(tweets):
                        break
                    tweet = tweets[index]
                    tweet.score = sentence.sentiment.score * sentence.sentiment.magnitude
                    tweet.save()
                    all_score_data.append({'score': tweet.score, 'timestamp': str(date)})
        else:
            for tweet in tweets:
                tweet.score  = (random.uniform(-1, 1) * random.uniform(0, 100))
                tweet.save()
                all_score_data.append({'score': tweet.score, 'timestamp': tweet.timestamp.strftime("%m-%d-%yT%H:%M:%SZ")})

        return all_score_data

