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

// 集合了点赞
router.get('/toggle-likes', auth, blogController.toggleLikes);

router.post('/add-comment', auth, blogController.addComment);

router.post('/del-comment', auth, blogController.delComment);

// 管理 获取博客统计信息
router.get('/blog-statistics', blogController.getStatistics);

//刷新统计数据
router.get('/refresh-statistics', blogController.refreshStatistics);

// 编辑页面 分类列表
router.get('/get-types', blogController.getTypes);
// 首页分类列表
router.get('/get-types/list', blogController.getTypesList);
// router.get('/add-types', auth, blogController.addTypes);



module.exports = router;