const OTPModel = require('../models/otp.model');
const { OTPResponse } = require('../helper/response.helper');

async function validateOTP(req, res, next) {
    try {
        const { code, email, password } = req.body;

        const existOTP = await OTPModel.findOne({ receiver: email });
        if (!existOTP)
            return res.status(404).json(OTPResponse.CodeNotFoundError());
        const isValid = await existOTP.validateCode(code);

        if (!isValid)
            return res.status(401).json(OTPResponse.InvalidCodeError());
        req.user = { email, password };
        next();
    } catch (error) {
        return res.status(500).json({
            code: '0050',
            status: 'error',
            error: 'internal-server-error',
            message: error.message,
        });
    }
}

module.exports = {
    validateOTP,
};
