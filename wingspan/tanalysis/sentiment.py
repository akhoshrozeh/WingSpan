from google.cloud import language_v1
from tanalysis.models import Tweet
from typing import List

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
        self.analyzer = language_v1.LanguageServiceClient()
        self.type = text_type

    def analyzeTweets(self, tweets: List[Tweet]):
        """

        Iterates through a given list of Tweet objects, uses the analyzer to perform sentiment analysis on the text,
        and updates the sentiment_score and sentiment_magnitude of each Tweet.

        Args:
            tweets (List[Tweet]): list of tweets to analyze

        Return:
            None
            
        """
        for tweet in tweets:
            document = language_v1.Document(content=tweet.text, type_=self.type)
            response = self.analyzer.analyze_sentiment(request={'document': document})
            tweet.sentiment_score = response.document_sentiment.score
            tweet.sentiment_magnitude = response.document_sentiment.magnitude
            tweet.save()

