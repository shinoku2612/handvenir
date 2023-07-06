const mongoose = require("mongoose");
const { ShinPayConnector } = require("../databases/mongo.connect");

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, ref: "User" },
        product_list: [
            {
                productId: { type: String, ref: "Product" },
                quantity: { type: Number },
            },
        ],
    },
    { timestamps: true },
);

module.exports = ShinPayConnector.model("Cart", CartSchema);
