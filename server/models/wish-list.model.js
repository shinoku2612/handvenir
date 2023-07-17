const mongoose = require("mongoose");
const { ShinPayConnector } = require("../databases/mongo.connect");

const WishListSchema = new mongoose.Schema(
    {
        userId: { type: String, ref: "User" },
        product_list: [
            {
                productId: { type: String, ref: "Product" },
                _id: false,
            },
        ],
    },
    { timestamps: true },
);

module.exports = ShinPayConnector.model("WishList", WishListSchema);
