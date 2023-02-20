const UserModel = require('../models/user.model');
const { AuthResponse } = require('../helper/response.helper');

async function registerController(req, res) {
    try {
        const { email, password } = req.user;
        const existUser = await UserModel.findOne({ email: email });
        if (existUser)
            return res.status(409).json(AuthResponse.DuplicatedError('email'));

        const newUser = new UserModel({ email, password });
        await newUser.save();
        return res.status(201).json(AuthResponse.SuccessfullyRegistered());
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
            return res.status(404).json(AuthResponse.UnregisteredError());
        const isValidUser = await existUser.validatePassword(password);
        if (!isValidUser)
            return res.status(401).json(AuthResponse.CredentialsError());
        return res
            .status(200)
            .json(AuthResponse.SuccessfullyLoggedIn({ userId: existUser._id }));
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
