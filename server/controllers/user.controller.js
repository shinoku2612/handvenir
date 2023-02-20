const UserModel = require('../models/user.model');

async function getUserById(req, res) {
    try {
        const { userId } = req.params;
        const existUser = await UserModel.findById(userId, {
            _id: 0,
            password: 0,
        });
        return res.status(200).json({
            code: '1020',
            status: 'success',
            message: 'Get information successfully!',
            data: existUser,
        });
    } catch (error) {}
}

module.exports = { getUserById };
