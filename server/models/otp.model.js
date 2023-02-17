const mongoose = require('mongoose');
const { ShinPayConnector } = require('../databases/mongo.connect');

const OTPSchema = new mongoose.Schema(
    {
        code: { type: String },
        receiver: { type: String, ref: 'User' },
        send_time: {
            type: Date,
            default: Date.now,
            index: { expires: JSON.parse(process.env.NODE_OTP_LIFE_TIME) },
        },
    },
    { timestamps: true },
);

module.exports = ShinPayConnector.model('OTP', OTPSchema);
