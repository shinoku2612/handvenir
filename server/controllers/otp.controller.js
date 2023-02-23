const { sendMail } = require('../helper/mail.helper');
const { generateOTP } = require('../helper/generator.helper');
const { registerMail } = require('../helper/template.helper');
const OTPModel = require('../models/otp.model');
const UserModel = require('../models/user.model');
const {
    OTPResponse,
    AuthResponse,
    ServerResponse,
} = require('../helper/response.helper');

async function sendOTP(req, res) {
    try {
        const { type, email, password } = req.body;

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
                const isAuthenticated = await user.validatePassword(password);
                if (!isAuthenticated)
                    return res
                        .status(404)
                        .json(AuthResponse.CredentialsError());
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
        return res
            .status(500)
            .json(ServerResponse.InternalError(error.message));
    }
}

module.exports = {
    sendOTP,
};
