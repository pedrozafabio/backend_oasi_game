const ErrorResponse = require("../utils/ErrorResponse");

const ErrorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	//Show error in console
	console.log(err.stack.red);

	//Bad object ID handling
	if (err.name === "CastError") {
		const message = `Resource not found with id of ${err.value}`;
		error = new ErrorResponse(message, 404);
	}

	//Duplicate key handling
	if (err.code === 11000) {
		const message = "Duplicate field value entered";
		error = new ErrorResponse(message, 400);
	}

	//Validation error handling
	if (err.name === "ValidationError") {
		const message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorResponse(message, 400);
	}

	//Other errors
	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "Server Error"
	});
};

module.exports = ErrorHandler;
