const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");

router.post("/check-out/:userId", OrderController.makeOrder);
router.get("/:userId", OrderController.getUserOrder);
router.get("/:userId/detail/:orderId", OrderController.getOrderDetail);

module.exports = router;
