from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from .twittercom import TwitterCom
from .sentiment import SentimentAnalyzer

# Create your views here.
def toJson(tweet):
    return {'text' : tweet.text, 'username' : tweet.username,
            'timestamp': tweet.timestamp, 'verified' : tweet.verified,
            'sentiment_score' : tweet.sentiment_score,
            'sentiment_magnitude' : tweet.sentiment_magnitude}

def index(request):
    """
    For the time being, the view just renders a list of tweets from a random keyword.
    This is where the frontend is rendered.
    """
    query = request.GET.get('query',None)
    if query is not None:
        sa = SentimentAnalyzer()
        tc = TwitterCom()
        tweets = tc.findTweets(query, 10)
        sa.analyzeTweets(tweets)
        tweets = list(map(lambda t: toJson(t), tweets))
        html = "<html><body> %s </body></html>" % tweets
        return HttpResponse(html)
    else:
        return HttpResponseBadRequest()

def api(request):
    query = request.GET.get('query',None)
    if query is not None:
        sa = SentimentAnalyzer()
        tc = TwitterCom()
        tweets = tc.findTweets(query)
        output = sa.analyzeTweets(tweets)
        output = list(map(lambda t: toJson(t), tweets))
        return JsonResponse(output, safe=False)
    else:
        return HttpResponseBadRequest()
