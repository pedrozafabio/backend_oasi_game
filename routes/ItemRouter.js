const express = require("express");

const { GetItems, CreateItem, GetItemByItemId, UpdateItem, DeleteItem, BuyItem } = require("../services/ItemService");

const AdvancedResults = require("../middleware/AdvancedResults");
const Authorization = require("../middleware/Authorization");
const Item = require("../models/Item");

const router = express.Router();

router.route("/").get(Authorization('user'),AdvancedResults(Item, null), GetItems).post(Authorization('admin'),CreateItem);

router.route("/:id").put(Authorization('admin'),UpdateItem).delete(Authorization('admin'),DeleteItem);

router.route("/:itemId").get(Authorization('user'),GetItemByItemId);

router.route("/buy/:itemId/:characterId").post(Authorization('same_user'),BuyItem);

module.exports = router;
