const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/review.controller");

router.post("/:userId/:productId", ReviewController.postReview);
router.get("/:productId", ReviewController.getAllReview);

module.exports = router;
