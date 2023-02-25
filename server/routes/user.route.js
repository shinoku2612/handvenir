const express = require('express');
const { getUserById, editUser } = require('../controllers/user.controller');
const router = express.Router();

router.get('/find/:userId', getUserById);
router.get('/edit/:userId', editUser);

module.exports = router;
