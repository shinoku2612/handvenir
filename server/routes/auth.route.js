const express = require('express');
const { validateOTP } = require('../middlewares/validator');
const {
    register,
    login,
    refreshToken,
    logout,
} = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', validateOTP, register);
router.post('/login', validateOTP, login);
router.put('/refresh-token/:userId', refreshToken);
router.delete('/logout/:userId', logout);

module.exports = router;
