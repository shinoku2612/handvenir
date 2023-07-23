const OrderModel = require("../models/order.model");

class OrderController {
    static async makeOrder(req, res) {
        try {
            const { userId } = req.params;
            const { status, total, ...orderDetail } = { ...req.body, userId };
            const order = new OrderModel(orderDetail);
            await order.save();
            return res.status(201).json(order);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async getOrder(req, res) {
        try {
            const { userId } = req.params;
            const order = await OrderModel.find({ userId });
            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
module.exports = OrderController;
