const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const BlogController = require('../controllers/blog')
const auth = require('../middleware/auth')
const blogController = new BlogController()

router.post('/add-blog', auth, blogController.addBlog);
router.get('/get-my-blog', auth, blogController.getMyBlog);
router.get('/get-index-blog', auth, blogController.getIndexBlog);
router.get('/thumbnails/:id', auth, blogController.getThumbnails);


module.exports = router;
