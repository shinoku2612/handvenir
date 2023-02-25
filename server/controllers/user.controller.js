const UserModel = require('../models/user.model');
const { ServerResponse, UserResponse } = require('../helper/response.helper');

async function getUserById(req, res) {
    try {
        const { userId } = req.params;
        const existUser = await UserModel.findById(userId, {
            _id: 0,
            password: 0,
        });
        return res
            .status(200)
            .json(UserResponse.SuccessfullyGetUser(existUser));
    } catch (error) {
        return res
            .status(500)
            .json(ServerResponse.InternalError(error.message));
    }
}

async function editUser(req, res) {
    try {
        const { userId } = req.params;
        const updatedInfo = { ...req.body };
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: updatedInfo },
            { new: true },
        );
        const { password, ...others } = updatedUser._doc;
        return res
            .status(200)
            .json(UserResponse.SuccessfullyUpdateUser(others));
    } catch (error) {
        res.status(500).json(ServerResponse.InternalError(error.message));
    }
}

module.exports = { getUserById, editUser };
