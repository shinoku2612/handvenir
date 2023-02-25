const JWT = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const {
    AuthResponse,
    ServerResponse,
    TokenResponse,
} = require('../helper/response.helper');
const {
    generateAccessToken,
    generateRefreshToken,
} = require('../helper/generator.helper');
const TokenModel = require('../models/token.model');

const cookieOptions = {
    path: '/',
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
};

async function register(req, res) {
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
async function login(req, res) {
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

        const refreshToken = generateRefreshToken({
            userId: existUser._id,
        });
        const newRefreshToken = new TokenModel({
            userId: existUser._id,
            refresh_token: refreshToken,
        });
        await newRefreshToken.save();
        return res
            .cookie('token', refreshToken, cookieOptions)
            .status(200)
            .json(
                AuthResponse.SuccessfullyLoggedIn({
                    userId: existUser._id,
                    accessToken,
                }),
            );
    } catch (error) {
        return res
            .status(500)
            .json(ServerResponse.InternalError(error.message));
    }
}

async function refreshToken(req, res) {
    try {
        const { userId } = req.params;
        const existToken = await TokenModel.findOne({
            userId: userId,
        });
        if (!existToken)
            return res.status(401).json(TokenResponse.TokenNotFound());

        const { token } = req.cookies;
        if (!token) return res.json(true);

        const isValidToken = await existToken.validateToken(token);
        if (!isValidToken)
            return res.status(401).json(TokenResponse.InvalidTokenError());

        JWT.verify(
            token,
            process.env.NODE_ACCESS_TOKEN_SECRET,
            async (error, payload) => {
                if (error)
                    return res
                        .status(401)
                        .json(TokenResponse.VerifyError(error.message));
                if (payload.userId !== userId)
                    return res.status(401).json(AuthResponse.Unauthorized());

                const accessToken = generateAccessToken({
                    userId: payload.userId,
                });
                const refreshToken = generateRefreshToken({
                    userId: payload.userId,
                });

                existToken.refresh_token = refreshToken;
                await existToken.save();
                return res
                    .cookie('token', refreshToken, cookieOptions)
                    .status(200)
                    .json(
                        TokenResponse.SuccessfullyRefresh({
                            userId: payload.userId,
                            accessToken,
                        }),
                    );
            },
        );
    } catch (error) {
        return res
            .status(500)
            .json(ServerResponse.InternalError(error.message));
    }
}

async function logout(req, res) {
    try {
        const { userId } = req.params;
        await TokenModel.deleteMany({ userId: userId });
        return res.clearCookie('token')
            .status(200)
            .json(AuthResponse.SuccessfullyLoggedOut());
    } catch (error) {
        return res
            .status(500)
            .json(ServerResponse.InternalError(error.message));
    }
}

module.exports = {
    register,
    login,
    refreshToken,
    logout,
};
