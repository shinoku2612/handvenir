const HGoogledrive = require("../helper/googledrive.helper");
const UserModel = require("../models/user.model");

class UserController {
    static async getUser(req, res) {
        try {
            const { userId } = req.params;
            const user = await UserModel.findById(userId, {
                _id: 0,
                secret: 0,
                createdAt: 0,
                updatedAt: 0,
            });
            // if(!user) return res.status(401).json("User not found")
            if (!user)
                return res.status(200).json({
                    email: "",
                    phone: "",
                    name: "",
                    gender: "",
                    date_of_birth: new Date(),
                    avatar: "",
                    addresses: [],
                });

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async updateUser(req, res) {
        try {
            const { userId } = req.params;
            const { email, status, secret, ...updatedInfo } = { ...req.body };
            const user = await UserModel.findOneAndUpdate(
                { _id: userId },
                {
                    $set: updatedInfo,
                },
                {
                    new: true,
                    projection: {
                        _id: 0,
                        secret: 0,
                        createdAt: 0,
                        updatedAt: 0,
                    },
                },
            );
            if (!user) return res.status(400).json("Failed to update");

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async insertAddress(req, res) {
        try {
            const { userId } = req.params;
            const address = req.body;
            const user = await UserModel.findOneAndUpdate(
                { _id: userId },
                {
                    $push: { addresses: address },
                },
                {
                    new: true,
                    projection: {
                        _id: 0,
                        secret: 0,
                        createdAt: 0,
                        updatedAt: 0,
                    },
                },
            );
            if (!user) return res.status(400).json("Failed to update");

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async deleteAddress(req, res) {
        try {
            const { userId } = req.params;
            const addressId = req.query.i;
            const user = await UserModel.findOneAndUpdate(
                { _id: userId },
                {
                    $pull: { addresses: { _id: addressId } },
                },
                {
                    new: true,
                    projection: {
                        _id: 0,
                        secret: 0,
                        createdAt: 0,
                        updatedAt: 0,
                    },
                },
            );
            if (!user) return res.status(400).json("Failed to update");

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async setDefaultAddress(req, res) {
        try {
            const { userId } = req.params;
            const addressId = req.query.i;
            await UserModel.findOneAndUpdate(
                { _id: userId, "addresses.isMain": true },
                {
                    $set: { "addresses.$.isMain": false },
                },
            );

            const user = await UserModel.findOneAndUpdate(
                { _id: userId, "addresses._id": addressId },
                {
                    $set: { "addresses.$.isMain": true },
                },
                {
                    new: true,
                    projection: {
                        _id: 0,
                        secret: 0,
                        createdAt: 0,
                        updatedAt: 0,
                    },
                },
            );

            if (!user) return res.status(400).json("Failed to update");

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async uploadAvatar(req, res) {
        try {
            const { userId } = req.params;
            const uploadedFile = req.file;
            if (!uploadedFile)
                return res
                    .status(400)
                    .json({ status: "error", error: "No file provided" });
            const user = await UserModel.findById(userId);
            const file = await HGoogledrive.uploadFile(
                `${process.env.NODE_ENV}-${user.name}-${user._id}`,
                uploadedFile,
            );
            user.avatar = file.webContentLink;
            await user.save();
            return res.status(200).json(user);
        } catch (error) {
            return res
                .status(500)
                .json({ status: "error", message: error.message });
        }
    }
}
module.exports = UserController;
