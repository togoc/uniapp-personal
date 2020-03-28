const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const UserController = require('../controllers/user')
const auth = require('../middleware/auth')
const userController = new UserController()

router.post('/login', userController.login);
router.post('/create-user', userController.createUser);

router.get('/user', auth, userController.getUser);
router.get('/logout', auth, userController.logout);
router.get('/logout-all', auth, userController.logoutAll);

module.exports = router;
