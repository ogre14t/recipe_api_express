//bring in dependencies
var express = require('express');
var mongoose = require('mongoose');
var uuid = require('node-uuid');

// set up mongodb connection
var app = express();
var mongoDB = 'mongodb: //127.0.0.1/RecipeApp';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema;

// Build mongoDB schemas and models
var recipeSchema = new Schema({
	name: String,
	image: { data: Buffer, contentType: String },
	ingredients: [],
	cookTimeInMinutes: Number,
	ovenTempInFahrenheit: Number,
	direction: String,
	numStars: { type: Number, max: 5, min: 0 },
	_recipeID: {
		type: String,
		default: function genUUid() {
			uuid.v1();
		}
	}
});

//build routes
app.get('/', (req, res) => {
	res.send('Main route.');
});
app.get('/addRecipe', (req, res) => {
	// Handle logic to create a new recipe
});

// setup server
var server = app.listen(8080, function() {
	var port = server.address().port;
	var host = server.address().address;
	console.log('Express running at http://%s:%s', host, port);
});
