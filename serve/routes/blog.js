const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const BlogController = require('../controllers/blog')
const auth = require('../middleware/auth')
const blogController = new BlogController()
router.post('/add-blog', auth, blogController.addBlog);
router.post('/edit-blog', auth, blogController.editBlog);

router.get('/delete/:id', auth, blogController.delete);

router.get('/get-my-liked', auth, blogController.getMyliked);
router.get('/get-my-blog', auth, blogController.getMyBlog);
router.get('/get-index-blog', blogController.getIndexBlog);
router.get('/search', blogController.search);
router.get('/toggle-likes', auth, blogController.toggleLikes);
router.post('/add-comment', auth, blogController.addComment);

router.get('/get-types', auth, blogController.getTypes);
router.get('/get-types/list', auth, blogController.getTypesList);
// router.get('/add-types', auth, blogController.addTypes);


router.get('/test', (req, res) => {
    console.log(req.query)
    console.log(req.body)
    res.send('ok');
});


module.exports = router;
