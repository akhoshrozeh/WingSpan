from django.shortcuts import render
from django.http import HttpResponse
from .models import TwitterCom

# Create your views here.
def index(request):
    try:
        twitter_launcher = TwitterCom()
        tweets = twitter_launcher.search_tweets("bachelorette", 20)
    except:
        tweets = []
    html = "<html><body> %s </body></html>" % tweets
    return HttpResponse(html)
