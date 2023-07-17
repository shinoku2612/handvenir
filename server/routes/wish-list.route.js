const express = require("express");
const router = express.Router();
const WishListController = require("../controllers/wish-list.controller");

router.get("/:userId", WishListController.getWishList);
router.post("/add/:userId", WishListController.addProduct);
router.delete("/remove/:userId/:productId", WishListController.removeProduct);
router.put("/sync-local/:userId", WishListController.syncLocalWishList);

module.exports = router;
