const mongoose = require("mongoose");
const { ShinPayConnector } = require("../databases/mongo.connect");

const CartSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        product_list: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: { type: Number },
                _id: false,
            },
        ],
    },
    { timestamps: true },
);

module.exports = ShinPayConnector.model("Cart", CartSchema);
