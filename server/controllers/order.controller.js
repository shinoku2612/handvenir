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
            const { total, page, limit } = req.query;
            let orderList = [];
            let sortOrder = 0;

            if (total) {
                if (total.toLowerCase() === "increase") sortOrder = 1;
                if (total.toLowerCase() === "decrease") sortOrder = -1;
            }
            if (!total || (sortOrder !== 1 && sortOrder !== -1)) {
                if (page && limit) {
                    const pageNumber = parseInt(page);
                    const limitNumber = parseInt(limit);
                    orderList = await OrderModel.find({ user: userId })
                        .skip((pageNumber - 1) * limitNumber)
                        .limit(limitNumber);
                } else {
                    orderList = await OrderModel.find({ user: userId });
                }
            }
            if (sortOrder === 1 || sortOrder === -1) {
                if (page && limit) {
                    const pageNumber = parseInt(page);
                    const limitNumber = parseInt(limit);
                    orderList = await OrderModel.find({ user: userId })
                        .sort({ total: sortOrder })
                        .skip((pageNumber - 1) * limitNumber)
                        .limit(limitNumber);
                } else {
                    orderList = await OrderModel.find({ user: userId }).sort({
                        total: sortOrder,
                    });
                }
            }
            const orderSize = await OrderModel.count();

            return res.status(200).json({ data: orderList, size: orderSize });
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
