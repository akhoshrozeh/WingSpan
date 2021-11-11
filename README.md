# WingSpan

CS 130 
Fall 2021  
Professor Kim

A web app that gives users a sentiment analysis from Twitter on different subjects/topics/keywords.

## Contributors: 

Richard Lee

Anthony Khoshrozeh

Alex Feinfield

Erica Vellanoweth

Jason Rauchwerk

Estee Tcheau  

## What is Wingspan?


## How to run the app locally

#### 1. Clone our repository by running the command

`git clone https://github.com/`

#### 2. In the project directory, install the dependencies by running the command

`npm install`

#### 3. In the project directory, start the app in development mode by running the command

`npm start`   

#### 4. If error 0308010C for unsupported envelope routines run command
`export NODE_OPTIONS=--openssl-legacy-provider`

#### 5. In the project directory, start the server by running the command

`node src/server.js`  

Note, you will likely need to open two separate command line windows for steps 3 and 4.

#### 6. Open the local host

Go to http://localhost:3000 in your browser to start the application!

## How to run the Django backend

#### 1. Navigate to the Wingspan folder and run

`pip install -r requirements.txt`

#### 2. Retrieve the .env file and place it in Wingspan/wingspan/wingspan

#### 3. Navigate to Wingspan/wingspan and run

`python manage.py runserver`

Note: To run with Python 3, you may need to do `python3 manage.py runserver`
