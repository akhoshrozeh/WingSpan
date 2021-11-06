from google.cloud import language_v1
from tanalysis.models import Tweet
from typing import List

class SentimentAnalyzer():
    def __init__(self, text_type=language_v1.Document.Type.PLAIN_TEXT, language='en'):
        self.analyzer = language_v1.LanguageServiceClient()
        self.type = text_type
        self.language = 'en'

    def analyzeTweets(self, tweets: List[Tweet]):
        for tweet in tweets:
            document = language_v1.Document(content=tweet.text, type_=self.type)
            response = self.analyzer.analyze_sentiment(request={'document': document})
            tweet.sentiment_score = response.document_sentiment.score
            tweet.sentiment_magnitude = response.document_sentiment.magnitude
            tweet.save()

