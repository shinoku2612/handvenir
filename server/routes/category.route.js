const express = require("express");
const CategoryController = require("../controllers/category.controller");
const router = express.Router();

router.get("/", CategoryController.getAllCategories);

module.exports = router;
