const AdvancedResults = (model, populate) => async (req, res, next) => {
	let query;

	const reqQuery = { ...req.query };

	//Removing select from query
	const removeFields = [ "select", "sort", "limit", "page" ];

	removeFields.forEach((param) => delete reqQuery[param]);

	console.log(reqQuery);

	let queryStr = JSON.stringify(reqQuery);
	queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

	query = model.find(JSON.parse(queryStr));

	//Select logic
	if (req.query.select) {
		const fields = req.query.select.split(",").join(" ");
		query = query.select(fields);
	}

	//Sort logic
	if (req.query.sort) {
		const sortBy = req.query.sort.split(",").join(" ");
		query = query.sort(sortBy);
	}
	else {
		query = query.sort("-createdAt");
	}

	//Pagination logic
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 25;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	//Total amount of indexes
	const total = await model.countDocuments();

	query = query.skip(startIndex).limit(limit);

	if (populate) {
		query = query.populate(populate);
	}

	const results = await query;

	const pagination = {};

	//Checking for previous and next pages
	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit
		};
	}
	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit
		};
	}

	res.advancedResults = {
		success: true,
		count: results.length,
		pagination,
		data: results
	};

	next();
};

module.exports = AdvancedResults;
