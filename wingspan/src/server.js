// Initializations of APIs
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); // Sets our application to express
app.use(cors()); // Allows express to respond to requests
app.use(bodyParser.json()); // Asks for a JSON to be used

let searchQuery = "";

/* Retrieves search query from front page and sets to searchQuery */
app.post('/', function (request, response) {
	searchQuery = request.body.query;
	console.log(searchQuery);
});

/* Retrieves search query from navbar and sets to searchQuery */
app.post('/main', function (request, response) {
	searchQuery = request.body.query;
	console.log(searchQuery);
});

/* Sets port for express server */
app.listen(3001, () => {
    console.log('Server Listening on port 3001');
});

module.exports = app;