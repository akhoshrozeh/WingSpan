# WingSpan

CS 130 
Fall 2021  
Professor Kim

A web app that gives users a sentiment analysis from Twitter on different subjects/topics/keywords.

Simply enter a query (and an optional list of Twitter users) into the search bar and click the button to receive graphs summarizing the sentiment of Tweets and top Tweets from verified accounts related to your query.

The available graphs include:
- Line graph plotting the average sentiment of all Tweets each day for the past week
- Histogram chart showing the sentiment ratings of each Tweet
- Line graph showing the trends of the average positive sentiment and average negative sentiment each day for the past week

## Contributors: 

Richard Lee

Anthony Khoshrozeh

Alex Feinfield

Erica Vellanoweth

Jason Rauchwerk

Estee Tcheau  

## How to run the app locally

#### 1. Clone our repository by running the command

`git clone https://github.com/akhoshrozeh/WingSpan.git`

#### 2. Obtain the proper Twitter and Google NLP credentials from one of the contributors

#### 3. Ensure you're using Node v17.1.0

If you have `nvm`, run `nvm install 17.1.0` and you will begin using Node v17.1.0
If you already have it, you can run `nvm use 17.1.0`
You can check by running `node --version`

#### 4. Install dependencies in '/scripts'

Run `cd scripts` to enter the `scripts` directory.
Then run `./setup.sh`, which will install dependencies for the React and Django. 

#### 5. In the '/scripts', start the app by running the command

`./run.sh`

#### 6. Open the local host

Go to http://localhost:3000 in your browser to start the application!



## Running Tests

#### 1. Go to the '/scripts' directory

#### 2. Django Tests
Run `./django_tests.sh` to begin running the Django tests.
After this script runs, a report should be printed telling about the success of the tests and its coverage of statements and branches.

#### 3. React Tests
Run `./react_tests.sh` to begin running the React tests.
This test will report test success and coverage for the frontend files.
