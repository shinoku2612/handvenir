const express = require("express");
const router = express.Router();
const WishListController = require("../controllers/wish-list.controller");
const MVerifier = require("../middlewares/verifier.middleware");

router.get(
    "/:userId",
    MVerifier.verifyAuthorization,
    WishListController.getWishList,
);
router.post(
    "/add/:userId",
    MVerifier.verifyAuthorization,
    WishListController.addProduct,
);
router.delete(
    "/remove/:userId/:productId",
    MVerifier.verifyAuthorization,
    WishListController.removeProduct,
);
router.put(
    "/sync-local/:userId",
    MVerifier.verifyAuthorization,
    WishListController.syncLocalWishList,
);

module.exports = router;
