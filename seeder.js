const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const Character = require("./models/Character");
const Item = require("./models/Item");

//Connect do DB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});

//Read JSON
const characters = JSON.parse(fs.readFileSync(`${__dirname}/_data/characters.json`, "utf-8"));
const items = JSON.parse(fs.readFileSync(`${__dirname}/_data/items.json`, "utf-8"));

//Import JSON data into database
const importData = async () => {
	try {
		await Character.create(characters);
		await Item.create(items);
		console.log("JSON data imported to DB".green.inverse);
		process.exit();
	} catch (err) {
		console.error(err);
	}
};

//Delete data from DB
const deleteData = async () => {
	try {
		await Character.deleteMany();
		await Item.deleteMany();
		console.log("DB data deleted".red.inverse);
		process.exit();
	} catch (err) {
		console.error(err);
	}
};

if (process.argv[2] === "-i") {
	importData();
}
else if (process.argv[2] === "-d") {
	deleteData();
}
