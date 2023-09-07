const ReviewModel = require("../models/review.model");

class ReviewController {
    static async postReview(req, res) {
        try {
            const { userId, productId } = req.params;
            const { comment } = req.body;
            const review = new ReviewModel({
                comment,
                user: userId,
                product: productId,
            });
            await review.save();
            return res.status(200).json(review);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async updateReview(req, res) {}
    static async deleteReview(req, res) {}
    static async getAllReview(req, res) {
        try {
            const { productId } = req.params;
            const reviews = await ReviewModel.find({
                product: productId,
            }).populate({
                path: "user",
                model: "User",
                select: "name avatar -_id",
            });
            return res.status(200).json(reviews);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async reactReview(req, res) {}
}
module.exports = ReviewController;
