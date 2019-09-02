var mongoose = require('mongoose');
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
	ingredients: { data: [], unit: typeof ingredient },
	time: Number,
	temp: Number,
	instructions: String,
	stars: { type: Number, max: 5, min: 0 }
});

module.exports.recipeSchema = recipeSchema;
