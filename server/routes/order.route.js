const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");

router.get("/:userId", OrderController.getOrder);
router.post("/check-out/:userId", OrderController.makeOrder);

module.exports = router;
