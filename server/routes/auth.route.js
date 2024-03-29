const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

const MValidator = require("../middlewares/validator.middleware");

router.post("/register", MValidator.validateEmail, AuthController.register);
router.get("/register", AuthController.registerWithLink);
router.post("/login", MValidator.validateEmail, AuthController.login);
router.get("/login", AuthController.loginWithLink);

router.get("/refresh-token/:userId", AuthController.refreshToken);
router.delete("/logout/:userId", AuthController.logout);

module.exports = router;
