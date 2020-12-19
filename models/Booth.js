const mongoose = require("mongoose");

const BoothSchema = new mongoose.Schema({
	token: {
		type: String,
		required: true
	},
	expireDate: {
		type: Date,
		required: true
	},
	host: {
		type: mongoose.Schema.ObjectId,
		ref: "Character",
		required: true
	}
});

module.exports = mongoose.model("Booth", BoothSchema);
