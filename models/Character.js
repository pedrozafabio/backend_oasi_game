const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	ponchoSize: {
		type: mongoose.Schema.ObjectId,
		ref: "Item"
	},
	headTexture: {
		type: mongoose.Schema.ObjectId,
		ref: "Item"
	},
	ponchoTexture: {
		type: mongoose.Schema.ObjectId,
		ref: "Item"
	},
	bodyColor: {
		type: mongoose.Schema.ObjectId,
		ref: "Item"
	},
	headColor: {
		type: mongoose.Schema.ObjectId,
		ref: "Item"
	},
	role: {
		type: String,
		required: true,
		enum: [ "user", "admin", "staff" ]
	},
	friends: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "Character"
		}
	],
	logoutPos: {
		type: [ Number ],
		maxlength: 3,
		minlength: 3
	},
	sceneIndex: {
		type: Number,
		min: 0
	},
	loggedIn: {
		type: Boolean,
		default: false
	},
	photoList: {
		type: [ String ],
		maxlength: process.env.MAX_PHOTOS_PER_USER
	},
	points: {
		type: Number,
		required: true
	},
	achievements: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "Achievement"
		}
	],
	completedTutorial: {
		type: Boolean,
		default: false
	},
	itemsIdList: {
		type: [ Number ]
	},
	ida: {
		type: String,
		required:[true, 'Every character must be linked to an IDA account.'],
		unique:[true, 'This IDA account is already linked to a character.'],
		default: null
	},
});

module.exports = mongoose.model("Character", CharacterSchema);
