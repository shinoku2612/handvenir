const OTPModel = require('../models/otp.model');

async function validateOTP(req, res, next) {
    try {
        const { code, email, password } = req.body;

        const OTP = await OTPModel.findOne({ receiver: email });
        const isValid = await OTP.validateCode(code);

        if (!isValid)
            return res.status(401).json({
                code: '0041',
                status: 'error',
                error: 'unauthorized',
                message: 'Invalid code!',
            });
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
