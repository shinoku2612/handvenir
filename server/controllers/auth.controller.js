const UserModel = require('../models/user.model');

async function registerController(req, res) {
    try {
        const { email, password } = req.user;
        const newUser = new UserModel({ email, password });
        await newUser.save();
        return res.status(200).json({
            code: '1020',
            status: 'success',
            message: 'Successfully register. Welcome to our platform',
            data: 'Successfully register. Welcome to our platform',
        });
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
    registerController,
};
