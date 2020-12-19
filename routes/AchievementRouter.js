const express = require("express");

const {
    GetAchievements,
    GetAchievementById,
    CreateAchievement,
    UpdateAchievement,
    DeleteAchievement
} = require("../services/AchievementService");

const AdvancedResults = require("../middleware/AdvancedResults");
const Authorization = require("../middleware/Authorization");
const Achievement = require("../models/Achievement");

const router = express.Router();

router.route("/").get(Authorization('user'),AdvancedResults(Achievement, null), GetAchievements).post(Authorization('staff'), CreateAchievement);

router.route("/:achievementId").get(Authorization('user'),GetAchievementById).put(Authorization('staff'),UpdateAchievement).delete(Authorization('staff'),DeleteAchievement);

module.exports = router;
