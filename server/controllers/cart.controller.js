const CartModel = require("../models/cart.model");

class CartController {
    static async getCart(req, res) {
        try {
            const { userId } = req.params;
            const cart = await CartModel.findOne({ user: userId }).lean();
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }
            const total = await CartController.calculateTotal(cart.product_list);
            if (total === -1)
                return res.status(500).json("Failed to get total cart value");
            return res.status(200).json({ ...cart, total });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async addProduct(req, res) {
        try {
            const { userId } = req.params;
            const { productId, quantity } = req.body;
            if (quantity <= 0) return res.status(400).json("Invalid quantity");

            let cart = await CartModel.findOneAndUpdate(
                {
                    user: userId,
                    product_list: { $elemMatch: { product: productId } },
                },
                {
                    $inc: { "product_list.$.quantity": quantity },
                },
                { new: true, lean: true },
            );
            if (!cart) {
                cart = await CartModel.findOneAndUpdate(
                    { user: userId },
                    {
                        $push: {
                            product_list: {
                                product: productId,
                                quantity,
                            },
                        },
                    },
                    { new: true, upsert: true, lean: true },
                );
            }
            const total = await CartController.calculateTotal(cart.product_list);
            if (total === -1)
                return res.status(500).json("Failed to get total cart value");
            return res.status(200).json({ ...cart, total });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async removeProduct(req, res) {
        try {
            const { userId, productId } = req.params;
            const cart = await CartModel.findOneAndUpdate(
                { user: userId },
                { $pull: { product_list: { product: productId } } },
                { new: true, lean: true },
            );
            if (!cart)
                return res.status(404).json({ message: "Cart not found" });

            if (cart.product_list.length === 0) {
                await CartModel.findOneAndRemove({ user: userId });
                return res.status(200).json(null);
            }

            const total = await CartController.calculateTotal(cart.product_list);
            if (total === -1)
                return res.status(500).json("Failed to get total cart value");
            return res.status(200).json({ ...cart, total });
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
                {
                    user: userId,
                    product_list: { $elemMatch: { product: productId } },
                },
                {
                    $set: { "product_list.$.quantity": quantity },
                },
                { new: true, lean: true },
            );
            const total = await CartController.calculateTotal(cart.product_list);
            if (total === -1)
                return res.status(500).json("Failed to get total cart value");
            return res.status(200).json({ ...cart, total });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async syncLocalCart(req, res) {
        try {
            const { userId } = req.params;
            const { productList } = req.body;
            let cart = await CartModel.findOne({ user: userId }).lean();

            if (cart) {
                for (const { product, quantity } of productList) {
                    const existingProduct = cart.product_list.find(
                        (item) => item.product.toString() === product,
                    );
                    if (existingProduct) existingProduct.quantity += quantity;
                    else cart.product_list.push({ product, quantity });
                }
                await CartModel.updateOne(
                    { user: userId },
                    { product_list: cart.product_list },
                );
            } else {
                cart = await CartModel.create({
                    user: userId,
                    product_list: productList,
                });
            }

            const total = await CartController.calculateTotal(
                cart.product_list,
            );
            if (total === -1) {
                return res
                    .status(500)
                    .json({ message: "Failed to calculate total cart value" });
            }

            return res.status(200).json({ ...cart, total });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    static async calculateTotal(productList) {
        try {
            const cart = await new CartModel({
                product_list: productList,
            }).populate({ path: "product_list.product", model: "Product" });

            const total = cart.product_list.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0,
            );
            return total;
        } catch (error) {
            return -1;
        }
    }
}
module.exports = CartController;
