const mongoose = require("mongoose");
const { ShinPayConnector } = require("../databases/mongo.connect");
const URLSlug = require("mongoose-slug-generator");
ShinPayConnector.plugin(URLSlug);

const CategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, slug: "name", unique: true },
    },
    { timestamps: true },
);

module.exports = ShinPayConnector.model("Category", CategorySchema);
