const CartModel = require("../models/cart.model");

class CartController {
    static async getCart(req, res) {
        try {
            const { userId } = req.params;
            const cart = await CartModel.findOne({ userId: userId });
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async addProduct(req, res) {
        try {
            const { userId } = req.params;
            const { productId, quantity } = req.body;
            if (quantity <= 0) return res.status(400).json("Invalid quantity");

            const cart = await CartModel.findOneAndUpdate(
                { userId, product_list: { $elemMatch: { productId } } },
                {
                    $inc: { "product_list.$.quantity": quantity },
                },
                { new: true },
            );

            if (cart) {
                return res.status(200).json(cart);
            }

            const newCart = await CartModel.findOneAndUpdate(
                { userId },
                {
                    $push: {
                        product_list: {
                            productId,
                            quantity,
                        },
                    },
                },
                { new: true, upsert: true },
            );

            return res.status(200).json(newCart);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async removeProduct(req, res) {
        try {
            const { userId, productId } = req.params;
            const cart = await CartModel.findOneAndUpdate(
                { userId: userId },
                { $pull: { product_list: { productId: productId } } },
                { new: true },
            );
            if (!cart) return res.status(200).json(null);

            if (cart.product_list.length === 0) {
                await CartModel.findOneAndRemove({ userId: userId });
                return res.status(200).json(null);
            }
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async updateCart(req, res) {
        try {
            const { userId } = req.params;
            const { productId, quantity } = req.body;
            if (quantity <= 0) return res.status(400).json("Invalid quantity");

            const cart = await CartModel.findOneAndUpdate(
                { userId, product_list: { $elemMatch: { productId } } },
                {
                    $set: { "product_list.$.quantity": quantity },
                },
                { new: true },
            );

            return res.status(200).json(cart);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async checkout(req, res) {}
    static async syncLocalCart(req, res) {
        try {
            const { userId } = req.params;
            const { productList } = req.body;
            const cart = await CartModel.findOne({ userId: userId });
            if (cart) {
                for (const { productId, quantity } of productList) {
                    const existingProduct = cart.product_list.find(
                        (product) => product.productId === productId,
                    );
                    if (existingProduct) existingProduct.quantity += quantity;
                    else cart.product_list.push({ productId, quantity });
                }
                await cart.save();
                return res.status(200).json(cart);
            } else {
                const newCart = new CartModel({
                    userId: userId,
                    product_list: productList,
                });
                await newCart.save();
                return res.status(200).json(newCart);
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async getCartTotal(req, res) {
        try {
            const { productList } = req.body;
            const cart = await new CartModel({
                product_list: productList,
            }).populate({ path: "product_list.productId", model: "Product" });

            const total = cart.product_list.reduce(
                (total, product) =>
                    total + product.productId.price * product.quantity,
                0,
            );
            res.status(200).json({ total });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
module.exports = CartController;
