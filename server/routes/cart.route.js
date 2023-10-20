const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");
const MVerifier = require("../middlewares/verifier.middleware");

router.get("/:userId", MVerifier.verifyAuthorization, CartController.getCart);
router.post(
    "/add/:userId",
    MVerifier.verifyAuthorization,
    CartController.addProduct,
);
router.delete(
    "/remove/:userId/:productId",
    MVerifier.verifyAuthorization,
    CartController.removeProduct,
);
router.put(
    "/update/:userId",
    MVerifier.verifyAuthorization,
    CartController.updateCart,
);
router.put(
    "/sync-local/:userId",
    MVerifier.verifyAuthorization,
    CartController.syncLocalCart,
);

module.exports = router;
