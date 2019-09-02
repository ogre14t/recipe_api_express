var mongoose = require('mongoose');
require('dotenv').config();
var Recipes = require('./models/Recipes.js');

var mongoDB = process.env.DB_CONN;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(callback) {
	console.log('Connection to database succeeded');
});

var Recipe = mongoose.model('recipe', Recipes.recipeSchema);

module.exports.Recipe = Recipe;
