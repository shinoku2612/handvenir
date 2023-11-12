const mongoose = require("mongoose");
const { ShinPayConnector } = require("../databases/mongo.connect");

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        secret: { type: String, required: true }, //
        phone: { type: String, default: "" },
        name: { type: String, default: "User" },
        gender: { type: String, default: "Male" },
        date_of_birth: { type: Date, default: new Date() },
        avatar: { type: String, default: "" },
        addresses: [
            {
                country: { type: String },
                city: { type: String },
                district: { type: String },
                town: { type: String },
                street: { type: String },
                isMain: { type: Boolean, default: false },
            },
        ],
        status: {
            type: String,
            enum: ["disabled", "active"],
            default: "active",
        },
    },
    { timestamps: true },
);

// UserSchema.pre('save', async function (next) {
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashSecret = await bcrypt.hash(this.secret, salt);
//         this.secret = hashSecret;
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = ShinPayConnector.model("User", UserSchema);
