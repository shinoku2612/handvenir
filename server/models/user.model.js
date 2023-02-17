const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
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
            },
        ],
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
