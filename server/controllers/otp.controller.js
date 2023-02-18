const sendMail = require('../helper/mail.helper');
const generateOTP = require('../helper/otp.helper');
const OTPModel = require('../models/otp.model');
const UserModel = require('../models/user.model');

async function sendOTP(req, res) {
    try {
        req.user = null;
        const { type, email, password } = req.body;

        const existOTP = await OTPModel.findOne({ receiver: email });
        if (existOTP) {
            await existOTP.delete();
            return res.status(400).json({
                code: '0040',
                status: 'error',
                error: 'bad-request',
                message: 'Only 1 request at the same time, please wait!',
            });
        }

        const user = await UserModel.findOne({ email: email });
        const OTPCode = generateOTP(6);
        const newOTP = new OTPModel({
            code: OTPCode,
            receiver: email,
        });
        switch (type) {
            case 'register': {
                if (user)
                    return res.status(409).json({
                        code: '0049',
                        status: 'error',
                        error: 'duplicated',
                        message: 'Email has already been in used!',
                    });
                break;
            }
            case 'login': {
                if (!user)
                    return res.status(404).json({
                        code: '0044',
                        status: 'error',
                        error: 'not-found',
                        message:
                            'Cannot reach this user, please check you credentials and try again!',
                    });
                break;
            }
            default: {
                return res.status(404).json({
                    code: '0040',
                    status: 'error',
                    error: 'bad-request',
                    message: `Unexpected request type :: type=${type}!`,
                });
            }
        }
        req.user = { email, password };
        await newOTP.save();
        sendMail(email, 'Account register');
        return res.status(201).json({
            code: '1021',
            status: 'success',
            message: 'Please check your email to receiver OTP code!',
            data: newOTP,
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {
    sendOTP,
};
