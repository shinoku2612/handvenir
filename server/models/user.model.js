const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ShinPayConnector } = require('../databases/mongo.connect');

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, default: '' },
        first_name: { type: String, default: 'User' },
        last_name: { type: String, default: 'Client' },
        gender: { type: String, default: 'Male' },
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

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});
UserSchema.methods.validatePassword = async function (password) {
    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        return false;
    }
};

module.exports = ShinPayConnector.model('User', UserSchema);
