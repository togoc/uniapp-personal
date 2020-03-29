const express = require('express');
const router = express.Router();

const FileController = require('../controllers/file')
const auth = require('../middleware/auth')
const fileController = new FileController()


router.post('/blog-img', auth, fileController.saveBlogImg);

module.exports = router;
