from django.shortcuts import render
from django.http import HttpResponse
from .models import Tweets

# Create your views here.
def index(request):
    try:
        twit_launcher = Tweets()
        tweets = twit_launcher.search_tweets("ruggs", 20)
    except:
        tweets = []
    html = "<html><body> %s </body></html>" % tweets
    return HttpResponse(html)
