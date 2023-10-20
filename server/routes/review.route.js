const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/review.controller");
const MVerifier = require("../middlewares/verifier.middleware");

router.post(
    "/:userId/:productId",
    MVerifier.verifyAuthorization,
    ReviewController.postReview,
);
router.get("/:productId", ReviewController.getAllReview);

module.exports = router;
