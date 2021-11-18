// Initializations of APIs
const express = require('express');
const request = require('request');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); // Sets our application to express
app.use(cors()); // Allows express to respond to requests
app.use(bodyParser.json()); // Asks for a JSON to be used

let searchQuery = "";
let djangoSearch = "http://127.0.0.1:8000/api?query=";

/* Retrieves search query from front page and sets to searchQuery */
app.post('/', async function (req, res) {
	searchQuery = req.body.query;
	
	request((djangoSearch + searchQuery), async function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(searchQuery);

			/* Retrieves the body (data) from Django server consisting of tweets */
			let tweets = JSON.parse(body);
			/* Example on how to access the data */
			console.log(tweets[0]);
		}
	});	
	
	console.log(searchQuery);
});

/* Listens for Express server */
app.listen(3001, () => {
    console.log('Server Listening on port 3001');
});

module.exports = app;
