const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
	user: {
		type: Schema.Types.ObjectID,
		ref: 'User',
		required: true
	},
	title: {
		type: String,
		required: true
	},
	image: String,
	recipe: {
		type: String,
		required: true
	},
	ingredients: [],
	published: {
		type: Boolean,
		default: false,
		required: true
	}
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;