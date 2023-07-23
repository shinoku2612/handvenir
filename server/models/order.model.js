const mongoose = require("mongoose");
const { ShinPayConnector } = require("../databases/mongo.connect");
const ProductModel = require("./product.model");

const OrderSchema = new mongoose.Schema(
    {
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
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        method: { type: String, default: "COD" },
        total: { type: Number },
        status: {
            type: String,
            enum: ["pending", "shipping", "paid", "canceled"],
            default: "pending",
        },
        address: { type: String, required: true },
    },
    { timestamps: true },
);
OrderSchema.pre("save", async function (next) {
    try {
        const products = await ProductModel.find({
            _id: { $in: this.product_list.map((item) => item.product) },
        });
        this.total = this.product_list.reduce(
            (total, item) =>
                total +
                products.find((product) => product._id.equals(item.product))
                    .price *
                    item.quantity,
            0,
        );
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = ShinPayConnector.model("Order", OrderSchema);
