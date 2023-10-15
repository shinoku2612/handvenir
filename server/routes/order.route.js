const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");

router.post("/:userId/check-out", OrderController.makeOrder);
router.get("/:userId", OrderController.getUserOrder);
router.get("/:userId/detail/:orderId", OrderController.getOrderDetail);
router.put("/:userId/cancel/:orderId", OrderController.cancelOrder);

module.exports = router;
