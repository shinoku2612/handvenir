const express = require('express');
const { getUserById } = require('../controllers/user.controller');
const router = express.Router();

router.get('/find/:userId', getUserById);

module.exports = router;
