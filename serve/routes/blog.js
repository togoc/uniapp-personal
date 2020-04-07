const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const BlogController = require('../controllers/blog')
const auth = require('../middleware/auth')
const blogController = new BlogController()
router.post('/add-blog', auth, blogController.addBlog);
router.get('/get-my-blog', auth, blogController.getMyBlog);
router.get('/get-index-blog', blogController.getIndexBlog);
router.get('/search', blogController.search);
router.get('/toggle-likes', auth, blogController.toggleLikes);
router.post('/add-comment', auth, blogController.addComment);

module.exports = router;
