const express = require('express');
const { validateOTP } = require('../middlewares/validator');
const { registerController } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', validateOTP, registerController);

module.exports = router;
