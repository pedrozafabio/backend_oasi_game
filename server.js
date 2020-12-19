const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const ErrorHandler = require("./middleware/ErrorHandler");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const SwaggerSpecs = require("./Swagger");

const CharacterRouter = require("./routes/CharacterRouter");
const ItemRouter = require("./routes/ItemRouter");
const AchievementRouter = require("./routes/AchievementRouter");
const ConnectToDB = require("./config/Database");

//Dotenv
// dotenv.config({ path: "./config/config.env" });

//Connect to MongoDB
ConnectToDB();

const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
	//Swagger
	app.use("/swagger", swaggerUi.serve, swaggerUi.setup(SwaggerSpecs));
}

//CORS
// console.log(process.env.ALLOWED_ORIGINS.split(';'));
let options = {credentials: true, origin: process.env.ALLOWED_ORIGINS.split(';')};
app.use(cors( options));
app.options('*', cors(options));


//Configuring body parse
app.use(express.json());

//Routes
app.use("/api/v1/characters", CharacterRouter);
app.use("/api/v1/items", ItemRouter);
app.use("/api/v1/achievements", AchievementRouter);

//Middleware
app.use(ErrorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(`App listening on port ${PORT} and running on ${process.env.NODE_ENV} mode.`.yellow.bold);
});

//Handle promise rejections
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`.red);

	//Close server
	server.close(() => process.exit(1));
});
