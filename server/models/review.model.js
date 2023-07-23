const mongoose = require("mongoose");
const { ShinPayConnector } = require("../databases/mongo.connect");

const ReviewSchema = new mongoose.Schema(
    {
        comment: { type: String },
        rating: { type: Number },
        like: { type: Number, default: 0 },
        productId: { type: String, ref: "Product", required: true },
        userId: { type: String, ref: "Product", required: true },
    },
    { timestamps: true },
);

module.exports = ShinPayConnector.model("Review", ReviewSchema);
