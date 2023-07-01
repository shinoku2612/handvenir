const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ShinPayConnector } = require('../databases/mongo.connect');

const OTPSchema = new mongoose.Schema(
    {
        code: { type: String },
        userId: { type: String, ref: 'User' },
        send_time: {
            type: Date,
            default: Date.now,
            index: { expires: JSON.parse(process.env.NODE_OTP_LIFE_TIME) },
        },
    },
    { timestamps: true },
);

OTPSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashCode = await bcrypt.hash(this.code, salt);
        this.code = hashCode;
        next();
    } catch (error) {
        next(error);
    }
});
OTPSchema.methods.verify = async function (code) {
    try {
        const result = await bcrypt.compare(code, this.code);
        if (result) this.delete();
        return result;
    } catch (error) {
        return false;
    }
};

module.exports = ShinPayConnector.model('OTP', OTPSchema);
