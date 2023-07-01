const HValidator = require('../helper/validator.helper');
class MValidator {
    static validateEmail(req, res, next) {
        try {
            const { email } = req.body;
            if (!HValidator.isValidEmail(email))
                return res.status(400).json('Invalid email format');
            next();
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static validatePassword(req, res, next) {
        try {
            const { type, password } = req.body;
            if (type === '2fa') return next();
            if (!HValidator.isValidPassword(password))
                return res
                    .status(400)
                    .json('You must register with a strong password');
            next();
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = MValidator;
