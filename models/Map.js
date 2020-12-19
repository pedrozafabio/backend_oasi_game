const mongoose = require("mongoose");

const MapSchema = new mongoose.Schema({
	festivalLogo: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model("Map", MapSchema);
