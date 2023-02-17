const express = require('express');
const OTPController = require('../controllers/otp.controller');
const router = express.Router();

// Create new OTP
router.post('/auth', OTPController.sendOTP);

module.exports = router;
