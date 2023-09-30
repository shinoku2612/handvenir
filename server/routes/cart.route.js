const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");

router.get("/:userId", CartController.getCart);
router.post("/add/:userId", CartController.addProduct);
router.delete("/remove/:userId/:productId", CartController.removeProduct);
router.put("/update/:userId", CartController.updateCart);
router.put("/sync-local/:userId", CartController.syncLocalCart);
router.post("/total", CartController.getCartTotal);

module.exports = router;
