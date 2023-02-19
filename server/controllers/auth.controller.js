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
async function loginController(req, res) {
    try {
        const { email, password } = req.user;
        const existUser = await UserModel.findOne({ email: email });
        if (!existUser)
            return res.status(404).json({
                code: '0044',
                status: 'error',
                error: 'notfound',
                message: 'User not found!',
            });
        const isValidUser = await existUser.validatePassword(password);
        if (!isValidUser)
            return res.status(401).json({
                code: '0041',
                status: 'error',
                error: 'unauthorized',
                message: 'Wrongs credentials!',
            });
        return res.status(200).json({
            code: '1020',
            status: 'success',
            message: 'Login success!',
            data: { userId: existUser._id },
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
    loginController,
};
