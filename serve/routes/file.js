const express = require('express');
const router = express.Router();

const FileController = require('../controllers/file')
const auth = require('../middleware/auth')
const fileController = new FileController()


router.post('/upload', auth, fileController.upLoad);

module.exports = router;