const mongoose = require("mongoose");

const ConnectToDB = async () => {
	const connect = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	});

	console.log(`MongoDB connected in ${connect.connection.host}`.cyan.underline.bold);
};

module.exports = ConnectToDB;
