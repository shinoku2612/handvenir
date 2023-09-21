const mongoose = require("mongoose");
const { ShinPayConnector } = require("../databases/mongo.connect");
const URLSlug = require("mongoose-slug-generator");
ShinPayConnector.plugin(URLSlug);

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        slug: { type: String, slug: "title", unique: true },
        categories: { type: Array, default: [] },
    },
    { timestamps: true },
);

module.exports = ShinPayConnector.model("Product", ProductSchema);
