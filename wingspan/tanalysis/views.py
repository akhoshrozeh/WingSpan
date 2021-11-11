from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from .twittercom import TwitterCom
from .sentiment import SentimentAnalyzer

# Create your views here.
def index(request):
    """
    For the time being, the view just renders a list of tweets from a random keyword.
    This is where the frontend is rendered.
    """
    try:
        twitter_launcher = TwitterCom()
        tweets = twitter_launcher.search_tweets("bachelorette", 20)
    except:
        tweets = []
    html = "<html><body> %s </body></html>" % tweets
    return HttpResponse(html)

def api(request):
    if 'query' in request:
        sa = SentimentAnalyzer()
        tc = TwitterCom()
        tweets = sa.analyzeTweets(tc.findTweets(request.query, 10))
        tweets = list(map(lambda t: vars(t)))
        return JSONResponse(tweets, safe=False)
    else:
        return HttpResponseBadRequest()
