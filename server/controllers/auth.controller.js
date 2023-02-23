const UserModel = require('../models/user.model');
const { AuthResponse, ServerResponse } = require('../helper/response.helper');
const { generateAccessToken } = require('../helper/generator.helper');

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
        return res
            .status(500)
            .json(ServerResponse.InternalError(error.message));
    }
}
async function loginController(req, res) {
    try {
        const { email, password } = req.user;
        const existUser = await UserModel.findOne({ email: email });
        if (!existUser)
            return res.status(404).json(AuthResponse.UnregisteredError());
        const isAuthenticated = await existUser.validatePassword(password);
        if (!isAuthenticated)
            return res.status(401).json(AuthResponse.CredentialsError());

        const accessToken = generateAccessToken({
            userId: existUser._id,
        });
        return res
            .cookie('token', accessToken, {
                domain: process.env.NODE_COOKIE_DOMAIN,
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })
            .status(200)
            .json(
                AuthResponse.SuccessfullyLoggedIn({
                    userId: existUser._id,
                }),
            );
    } catch (error) {
        return res
            .status(500)
            .json(ServerResponse.InternalError(error.message));
    }
}

module.exports = {
    registerController,
    loginController,
};
