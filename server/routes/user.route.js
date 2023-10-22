const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const UserController = require("../controllers/user.controller");
const MVerifier = require("../middlewares/verifier.middleware");

router.get(
    "/:userId/find",
    MVerifier.verifyAuthorization,
    UserController.getUser,
);
router.put(
    "/:userId/edit",
    MVerifier.verifyAuthorization,
    UserController.updateUser,
);
router.post(
    "/:userId/address/insert",
    MVerifier.verifyAuthorization,
    UserController.insertAddress,
);
router.delete(
    "/:userId/address/delete",
    MVerifier.verifyAuthorization,
    UserController.deleteAddress,
);
router.put(
    "/:userId/address/default",
    MVerifier.verifyAuthorization,
    UserController.setDefaultAddress,
);
router.put(
    "/:userId/avatar",
    upload.single("file"),
    MVerifier.verifyAuthorization,
    UserController.uploadAvatar,
);

module.exports = router;
