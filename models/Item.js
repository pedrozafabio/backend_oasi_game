const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

const ItemSchema = new mongoose.Schema({
	price: {
		type: Number
	},
	itemId: {
		type: Number,
		required: true,
		unique: true,
		min: 0,
		default: 0
	},
	sizeId: {
		type: Number,
		min: 0,
		default: null
	},
	textureId: {
		type: Number,
		min: 0,
		default: null
	},
	colorId: {
		type: Number,
		min: 0,
		default: null
	},
	category: {
		type: String,
		required: [true, "Please add the item category"],
		enum: [ "head", "poncho", "body" ]
	},
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	// _characters: [
	// 	{
	// 		type: mongoose.Schema.ObjectId,
	// 		ref: "Character"
	// 	}
	// ],
});

autoIncrement.initialize(mongoose.connection);
ItemSchema.plugin(autoIncrement.plugin, { model: 'Item', field: 'itemId' });

module.exports = mongoose.model("Item", ItemSchema);
