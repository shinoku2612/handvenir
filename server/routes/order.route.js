const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
const MVerifier = require("../middlewares/verifier.middleware");

router.post(
    "/:userId/check-out",
    MVerifier.verifyAuthorization,
    OrderController.makeOrder,
);
router.get(
    "/:userId",
    MVerifier.verifyAuthorization,
    OrderController.getUserOrder,
);
router.get(
    "/:userId/detail/:orderId",
    MVerifier.verifyAuthorization,
    OrderController.getOrderDetail,
);
router.put(
    "/:userId/cancel/:orderId",
    MVerifier.verifyAuthorization,
    OrderController.cancelOrder,
);

module.exports = router;
