const mongoose = require("mongoose");
const { ShinPayConnector } = require("../databases/mongo.connect");
const OrderModel = require("./order.model");

const ReviewSchema = new mongoose.Schema(
    {
        comment: { type: String },
        like: { type: Number, default: 0 },
        product: { type: String, ref: "Product", required: true },
        user: { type: String, ref: "Product", required: true },
    },
    { timestamps: true },
);
ReviewSchema.pre("save", async function (next) {
    try {
        const order = await OrderModel.findOne({
            user: this.user,
            "product_list.product": this.product,
            status: "paid",
        });
        if (!order) {
            const error = new Error(
                "You cannot review a product you did not buy.",
            );
            error.status = 403;
            throw error;
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = ShinPayConnector.model("Review", ReviewSchema);
