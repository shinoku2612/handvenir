const express = require('express');
const { validateOTP } = require('../middlewares/validator');
const {
    registerController,
    loginController,
} = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', validateOTP, registerController);
router.post('/login', validateOTP, loginController);

module.exports = router;
