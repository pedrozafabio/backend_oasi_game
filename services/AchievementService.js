const ErrorResponse = require("../utils/ErrorResponse");
const AsyncHandler = require("../middleware/AsyncHandler");

const Achievement = require("../models/Achievement");

exports.GetAchievements = (req, res, next) => {
	res.status(200).json(res.advancedResults);
};

exports.GetAchievementById = AsyncHandler(async (req, res, next) => {

	const achievement = await Achievement.findById(req.params.achievementId);

	if (!achievement) {
		return res.status(400).json({ success: false });
	}

	res.status(200).json({
		success: true,
		data: achievement
	});
});

exports.CreateAchievement = AsyncHandler(async (req, res, next) => {
	const achievement = await Achievement.create(req.body);

	res.status(201).json({
		success: true,
		data: achievement
	});
});

exports.UpdateAchievement = AsyncHandler(async (req, res, next) => {
	let achievement = await Achievement.findById(req.params.achievementId);

	if (!achievement) {
		next(new ErrorResponse(`Achievement not found with id of ${req.params.achievementId}`, 404));
	}
	else {
		const filter = { _id: req.params.achievementId };

		achievement = await Achievement.findOneAndUpdate(filter, req.body, {
			new: true,
			runValidators: true
		});

		res.status(200).json({ success: true, data: achievement });
	}
});

exports.DeleteAchievement = AsyncHandler(async (req, res, next) => {
	const achievement = await Achievement.findById(req.params.achievementId);

	if (!achievement) {
		next(new ErrorResponse(`Achievement not found with id of ${req.params.achievementId}`, 404));
	}
	else {
		achievement.remove();
		res.status(200).json({ success: true, data: {} });
	}
});