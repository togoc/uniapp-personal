const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const UserController = require('../controllers/user')

const userController = new UserController()

router.post('/login', userController.login);
router.post('/create-user', userController.createUser);


module.exports = router;
