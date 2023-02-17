const mongoose = require('mongoose');
const { ShinPayConnector } = require('../databases/mongo.connect');

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String },
        first_name: { type: String },
        last_name: { type: String },
        gender: { type: String },
        date_of_birth: { type: Date, default: new Date() },
        avatar: { type: String, default: '' },
        address_line: [
            {
                country: { type: String },
                city: { type: String },
                district: { type: String },
                town: { type: String },
                street: { type: String },
                isMain: { type: Boolean, default: false },
            },
        ],
    },
    { timestamps: true },
);

module.exports = ShinPayConnector.model('User', UserSchema);
