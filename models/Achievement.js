const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

const AchievementSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	awardPoints: {
		type: Number
	},
	achievementId: {
		type: Number,
		required: true,
		min: 0,
		default: 0
	},
	awardItems: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "Item"
		}
	]
});

autoIncrement.initialize(mongoose.connection);
AchievementSchema.plugin(autoIncrement.plugin, { model: 'Achievement', field: 'achievementId' });

module.exports = mongoose.model("Achievement", AchievementSchema);
