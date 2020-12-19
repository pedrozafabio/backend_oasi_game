const Item = require("../models/Item");
const Character = require("../models/Character");
const ErrorResponse = require("../utils/ErrorResponse");
const AsyncHandler = require("../middleware/AsyncHandler");

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags:
 *       - Items
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: password
 *           example: {
 *             "username": "someUsasda",
 *             "password": "somePassword"
 *           }
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             username:
 *               type: string
 *         examples:
 *           application/json: {
 *             "id": 1,
 *             "username": "someuser"
 *           }
 *       409:
 *         description: When the username is already in use
 */

exports.GetItems = (req, res, next) => {
	res.status(200).json(res.advancedResults);
};

// exports.GetItemById = AsyncHandler(async (req, res, next) => {
// 	const item = await Item.findById(req.params.id);

// 	if (!item) {
// 		return res.status(400).json({ success: false });
// 	}

// 	res.status(200).json({
// 		success: true,
// 		data: item
// 	});
// });

exports.GetItemByItemId = AsyncHandler(async (req, res, next) => {
	const item = await Item.findOne({itemId : req.params.itemId});

	if (!item) {
		return res.status(400).json({ success: false });
	}

	res.status(200).json({
		success: true,
		data: item
	});
});

exports.CreateItem = AsyncHandler(async (req, res, next) => {
	const item = await Item.create(req.body);
	res.status(201).json({
		success: true,
		data: item
	});
});

exports.UpdateItem = AsyncHandler(async (req, res, next) => {
	let item = await Item.findById(req.params.id);

	if (!item) {
		next(new ErrorResponse(`Item not found with id of ${req.params.id}`, 404));
	}
	else {
		// else if (item.user.toString() !== req.user.id && req.user.role !== "admin") {
		// 	next(new ErrorResponse(`User ${req.params.id} is not authorized to update this item`, 401));
		// }

		const filter = { _id: req.params.id };

		item = await Item.findOneAndUpdate(filter, req.body, {
			new: true,
			runValidators: true
		});

		// console.log(item);
		console.log(req.params.id);

		res.status(200).json({ success: true, data: item });
	}
});

exports.DeleteItem = AsyncHandler(async (req, res, next) => {
	const item = await Item.findById(req.params.id);

	if (!item) {
		next(new ErrorResponse(`Item not found with id of ${req.params.id}`, 404));
	}
	else {
		// else if (item.user.toString() !== req.user.id && req.user.role !== "admin") {
		// 	next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this item`, 401));
		// }
		item.remove();
		res.status(200).json({ success: true, data: {} });
	}
});

/**
 * @swagger
 * /buy/:itemId/:characterId:
 *   post:
 *     summary: Buy an item with a character
 *     description:
 *       "Attempts a purchase transaction of an item with a character. If the character doesn't have enough points, an error is returned."
 *     tags:
 *       - Items
 *     parameters:
 *     responses:
 */
exports.BuyItem = AsyncHandler(async (req, res, next) => {
	let character = await Character.findById(req.params.characterId);

	if (!character) {
		next(new ErrorResponse(`Character not found with id of ${req.params.characterId}`, 404));
	}
	else {
		// else if (character.user.toString() !== req.user.id && req.user.role !== "admin") {
		// 	next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this character`, 401));
		// }

		const item = await Item.findOne({itemId : req.params.itemId});

		if (!item) {
			next(new ErrorResponse(`Item not found with id of ${req.params.itemId}`, 404));
		}
		else{

			if(character.itemsIdList.includes(item.itemId)){
				next(new ErrorResponse(`Character ${character.username} already has the item ${item.name}`, 400));
			}

			else if(item.price === 0){
				next(new ErrorResponse(`The item ${item.name} is already free.`, 400));
			}

			else if(item.price > character.points){
				next(new ErrorResponse(`Character ${character.username} doesn't have enough points to buy this item`, 400));
			}

			else{
				var body = {};

				//Subtracting player points
				body.points = character.points - item.price;
				//Adding item to posessed items
				character.itemsIdList.push(item.itemId);
				body.itemsIdList = character.itemsIdList;

				const filter = { _id: req.params.characterId };

				character = await Character.findOneAndUpdate(filter, body, {
					new: true,
					runValidators: true
				});

				res.status(200).json({ success: true, data: {character} });
			}
		}
	}
});