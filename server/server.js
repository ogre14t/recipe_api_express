//bring in dependencies
var express = require('express');
var mongoose = require('mongoose');
var uuid = require('uuid/v1');
require('dotenv').config();

// set up mongodb connection and body-parser
var app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
var mongoDB = process.env.DB_CONN;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema;

// Declare Units of Measure
const units = {
	cup: 'cup',
	gram: 'gram',
	kilogram: 'kilogram',
	liter: 'liter',
	pound: 'pound',
	milliliter: 'milliliter',
	ounce: 'ounce',
	pint: 'pint',
	teaspoon: 'teaspoon',
	tablespoon: 'tablespoon'
};
// define the layout of an ingredient
const ingredient = { name: String, qty: Number, unit: typeof units };

// Build mongoDB schemas and models
var recipeSchema = new Schema({
	name: String,
	image: { data: Buffer, contentType: String },
	ingredientsList: [],
	cookTimeInMinutes: Number,
	ovenTempInFahrenheit: Number,
	directions: String,
	numStars: { type: Number, max: 5, min: 0 }
});
var recipeModel = mongoose.model('Recipe', recipeSchema);

//build routes
app.get('/', (req, res) => {
	res.send('Welcome');
});
// add a new recipe
app.post('/api/addRecipe', (req, res) => {
	// Handle logic to create a new recipe
	const {
		name,
		image,
		ingredients,
		time,
		temp,
		instructions,
		stars
	} = req.body;
	var newRecipe = new recipeModel({
		name: name,
		image: image,
		cookTimeInMinutes: time,
		ovenTempInFahrenheit: temp,
		directions: instructions,
		numStars: stars,
		ingredientsList: ingredients
	});
	const result = newRecipe.save();
	console.log(result);
	res.status(200).json({
		success: true,
		msg: 'The recipe ' + name + ' was saved.'
	});
});

// setup server
var server = app.listen(process.env.PORT, function() {
	var port = server.address().port;
	var host = server.address().address;
	console.log('Express running at http://%s:%s', host, port);
});
