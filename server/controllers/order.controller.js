const OrderModel = require("../models/order.model");

class OrderController {
    static async makeOrder(req, res) {
        try {
            const { userId } = req.params;
            const { status, total, ...orderDetail } = {
                ...req.body,
                user: userId,
            };
            const order = new OrderModel(orderDetail);
            await order.save();
            return res.status(201).json(order);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async getUserOrder(req, res) {
        try {
            const { userId } = req.params;
            const orderList = await OrderModel.find({ user: userId });
            return res.status(200).json(orderList);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async getOrderDetail(req, res) {
        try {
            const { userId, orderId } = req.params;
            const order = await OrderModel.findOne(
                {
                    user: userId,
                    _id: orderId,
                },
                { price: 0 },
            ).populate({
                path: "product_list.product",
                model: "Product",
                select: "title image description slug",
            });
            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
module.exports = OrderController;
