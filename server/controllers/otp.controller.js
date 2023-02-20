const sendMail = require('../helper/mail.helper');
const generateOTP = require('../helper/otp.helper');
const { registerMail } = require('../helper/template.helper');
const OTPModel = require('../models/otp.model');
const UserModel = require('../models/user.model');
const { OTPResponse, AuthResponse } = require('../helper/response.helper');

async function sendOTP(req, res) {
    try {
        const { type, email } = req.body;

        const existOTP = await OTPModel.findOne({ receiver: email });
        if (existOTP) {
            await existOTP.delete();
            return res.status(400).json(OTPResponse.MultipleCallError());
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
                    return res
                        .status(409)
                        .json(AuthResponse.DuplicatedError('email'));
                break;
            }
            case 'login': {
                if (!user)
                    return res
                        .status(404)
                        .json(AuthResponse.UnregisteredError());
                break;
            }
            default: {
                return res.status(400).json(OTPResponse.TypeError(type));
            }
        }

        await newOTP.save();
        sendMail(email, 'Account register', registerMail(OTPCode));

        return res.status(201).json(OTPResponse.SuccessfullySent());
    } catch (error) {
        return res.status(500).json({
            code: '0050',
            status: 'error',
            error: 'internal-server-error',
            messgae: error.message,
        });
    }
}

module.exports = {
    sendOTP,
};
