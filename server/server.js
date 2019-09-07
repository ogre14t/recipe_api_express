//bring in dependencies
var express = require('express');
require('dotenv').config();
var Models = require('./models.js');

var app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

//build routes
app.get('/', async (req, res) => {
	await Models.Recipe.find({}).then(function(recipes) {
		res.send(recipes);
	});
});
// add a new recipe
app.post('/api/addRecipe', async (req, res) => {
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
	var newRecipe = new Models.Recipe({
		name: name,
		image: image,
		time: time,
		temp: temp,
		instructions: instructions,
		stars: stars,
		ingredients: ingredients
	});
	const result = await newRecipe.save();

	console.log(result);
	res.status(200).json({
		success: true,
		msg: 'The recipe ' + newRecipe.name + ' was saved.'
	});
});

// Delete a recipe
app.post('/api/deleteRecipe', async (req, res) => {
	console.log('inputName: ' + req.param('inputName'));
	const nameToRemove = req.param('inputName');
	const result = await Models.Recipe.deleteOne(
		{
			name: nameToRemove
		},
		function(err) {
			if (err) {
				result = 'The Recipe you entered was not found.';
			}
		}
	);

	console.log(result);
	res.status(200).json({
		success: true,
		msg: 'The recipe ' + nameToRemove + ' was successfully deleted.'
	});
});
// setup server
var server = app.listen(process.env.PORT, function() {
	var port = server.address().port;
	var host = server.address().address;
	console.log('Express running at http://%s:%s', host, port);
});
