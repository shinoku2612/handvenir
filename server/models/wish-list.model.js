const mongoose = require("mongoose");
const { ShinPayConnector } = require("../databases/mongo.connect");

const WishListSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        product_list: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                _id: false,
            },
        ],
    },
    { timestamps: true },
);

module.exports = ShinPayConnector.model("WishList", WishListSchema);
