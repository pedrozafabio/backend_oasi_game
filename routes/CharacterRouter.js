const express = require("express");

const {
	GetCharacters,
	// CreateCharacter,
	GetCharacterById,
	UpdateCharacter,
	DeleteCharacter,
	AddItemToCharacter,
	GetCharacterByIda,
	GiveTakePoints,
	AddFriend
} = require("../services/CharacterService");

const AdvancedResults = require("../middleware/AdvancedResults");
const Authorization = require("../middleware/Authorization");
const Character = require("../models/Character");

const router = express.Router();

// router.route("/").get(Authorization('admin'),AdvancedResults(Character, null), GetCharacters).post(Authorization('all'), CreateCharacter);

router.route("/").get(Authorization('admin'),AdvancedResults(Character, null), GetCharacters);

router.route("/ida").get(Authorization('user'), GetCharacterByIda).post(Authorization('user'), GetCharacterByIda);

router.route("/add-friend/:friendUserName").post(Authorization('user'), AddFriend);

router.route("/:characterId").get(Authorization('user'),GetCharacterById).put(Authorization('same_user'),UpdateCharacter).delete(Authorization('staff'),DeleteCharacter);

router.route("/:characterId/:itemId").post(Authorization('same_user'), AddItemToCharacter);

router.route("/points").post(Authorization('same_user'), GiveTakePoints);

module.exports = router;
