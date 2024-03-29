const WishListModel = require("../models/wish-list.model");

class WishListController {
    static async getWishList(req, res) {
        try {
            const { userId } = req.params;
            const wishList = await WishListModel.findOne({ user: userId });
            return res.status(200).json(wishList);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async addProduct(req, res) {
        try {
            const { userId } = req.params;
            const { productId } = req.body;

            const wishList = await WishListModel.findOneAndUpdate(
                { user: userId },
                { $addToSet: { product_list: { product: productId } } },
                { new: true, upsert: true },
            );

            return res.status(200).json(wishList);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async removeProduct(req, res) {
        try {
            const { userId, productId } = req.params;
            const wishList = await WishListModel.findOneAndUpdate(
                { user: userId },
                { $pull: { product_list: { product: productId } } },
                { new: true },
            );
            if (!wishList) return res.status(200).json(null);

            if (wishList.product_list.length === 0) {
                await WishListModel.findOneAndRemove({ user: userId });
                return res.status(200).json(null);
            }
            return res.status(200).json(wishList);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async syncLocalWishList(req, res) {
        try {
            const { userId } = req.params;
            const { productList } = req.body;
            const wishList = await WishListModel.findOneAndUpdate(
                { user: userId },
                { $addToSet: { product_list: { $each: productList } } },
                { new: true, upsert: true },
            );

            return res.status(200).json(wishList);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
module.exports = WishListController;
