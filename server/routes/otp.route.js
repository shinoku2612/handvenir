const express = require('express');
const { sendOTP } = require('../controllers/otp.controller');
const router = express.Router();

// Create new OTP
router.post('/auth', sendOTP);

module.exports = router;
