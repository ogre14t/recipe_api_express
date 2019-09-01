//bring in dependencies
var express = require('express');
var mongoose = require('mongoose');
var uuid = require('node-uuid');
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
const units = [
	'cup',
	'gram',
	'kilogram',
	'liter',
	'pound',
	'milliliter',
	'ounce',
	'pint',
	'teaspoon',
	'tablespoon'
];
// define the layout of an ingredient
const ingredient = { name: String, qty: Number, unit: String };

// Build mongoDB schemas and models
var recipeSchema = new Schema({
	name: String,
	image: { data: Buffer, contentType: String },
	ingredientsList: [],
	cookTimeInMinutes: Number,
	ovenTempInFahrenheit: Number,
	directions: String,
	numStars: { type: Number, max: 5, min: 0 },
	_recipeID: {
		type: String,
		default: function genUUid() {
			uuid.v1();
		}
	}
});
var recipeModel = mongoose.model('Recipe', recipeSchema);

//build routes
app.get('/', (req, res) => {
	res.send('Welcome');
});
// add a new recipe
app.get('/addRecipe', (req, res) => {
	// Handle logic to create a new recipe
	var name = req.body.name;
	var image = req.body.image;
	var ingredients = req.body.ingredients;
	var time = req.body.cookTime;
	var temp = req.body.temp;
	var instructions = req.body.instructions;
	var stars = req.body.stars;
	var newRecipe = new recipeModel({
		name: name,
		image: image,
		cookTimeInMinutes: time,
		ovenTempInFahrenheit: temp,
		directions: instructions,
		numStars: stars,
		ingredientsList: ingredients
	});
	newRecipe.save();
});

// setup server
var server = app.listen(process.env.PORT, function() {
	var port = server.address().port;
	var host = server.address().address;
	console.log('Express running at http://%s:%s', host, port);
});
