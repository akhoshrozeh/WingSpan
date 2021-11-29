from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse

from tanalysis.models import Query
from .twittercom import TwitterCom
from .sentiment import SentimentAnalyzer
import json

# Create your views here.

def index(request):
    query = request.GET.get('query',None)
    if query is not None:
        sa = SentimentAnalyzer()
        tc = TwitterCom()
        tweets = tc.findTweets(query, 10)
        sa.analyzeTweets(tweets)
        tweets = list(map(lambda t: json.dumps(t), tweets))
        html = "<html><body> %s </body></html>" % tweets
        return HttpResponse(html)
    else:
        return HttpResponseBadRequest()

def api(request):
    """

    API takes the query_str and the list of users that are in the request from the frontend and passes
    them through the findTweets() and analyzeTweets() methods. After an anonymized list of scores is found,
    it is compiled with a list of top tweets by verified users for that query returned by getTopTweets().
    This JSON of data is returned back to the frontend.

    """
    query_str = request.GET.get('query',None)
    users = request.GET.get('users', None)
    if query_str is not None:
        sa = SentimentAnalyzer()
        tc = TwitterCom()
        query = Query(query=query_str)
        query.save()
        tweets = tc.findTweets(query)
        scores = sa.analyzeTweets(tweets)
        top_tweets = tc.getTopTweets(tweets)
        output = json.dumps({"scores":scores, "top_tweets":top_tweets})
        resp = JsonResponse(output, safe=False)
        resp["Access-Control-Allow-Headers"] = "Access-Control-Allow-Headers,Access-Control-Allow-Origin,Content-Type"
        resp["Access-Control-Allow-Origin"] = "http://localhost:3000"
        return resp
    else:
        return HttpResponseBadRequest()
