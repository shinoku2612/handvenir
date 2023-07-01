const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ShinPayConnector } = require("../databases/mongo.connect");

const TokenSchema = new mongoose.Schema(
    {
        userId: { type: String, ref: "User" },
        refresh_token: { type: String, required: true },
        saved_time: {
            type: Date,
            default: Date.now,
            index: { expires: 7 * 24 * 60 * 60 },
        },
    },
    { timestamps: true },
);

TokenSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashCode = await bcrypt.hash(this.refresh_token, salt);
        this.refresh_token = hashCode;
        next();
    } catch (error) {
        next(error);
    }
});

TokenSchema.methods.verify = async function (token) {
    try {
        const result = await bcrypt.compare(token, this.refresh_token);
        return result;
    } catch (error) {
        return false;
    }
};

module.exports = ShinPayConnector.model("Token", TokenSchema);
