
const BlogService = require('../services/blog')

const blogService = new BlogService()

class BlogController {
    async addBlog(req, res) {
        try {
            let { body, user } = req



            await blogService.addBlog(body, user)

            res.send('保存成功(saved)!');

        } catch (error) {

            res.status(500).send(error.toString());

        }

    }

    async editBlog(req, res) {

    }

    async getMyBlog(req, res) {
        try {

            let { _id } = req.user
            let { page } = req.query

            let blogs = await blogService.getMyBlog(_id, page)

            res.status(200).send(blogs);

        } catch (error) {
            res.status(500).send(error.toString());
        }
    }

    async getIndexBlog(req, res) {
        try {
            let { page, id } = req.query

            let blogs = await blogService.getIndexBlog(page, id)

            res.status(200).send(blogs);

        } catch (error) {
            res.status(500).send(error.toString());
        }
    }

    async getThumbnails(req, res) {
        try {
            console.log(req.params)
            let blogID = req.params.id

            let thumbnails = await blogService.getThumbnails(blogID)

            res.status(200).send(thumbnails);

        } catch (error) {

            res.status(500).send(error.toString());
        }
    }

    async search(req, res) {
        try {

            let { keyword } = req.query

            let blogs = await blogService.search(keyword.trim())

            res.status(200).send(blogs);

        } catch (error) {
            res.status(500).send('搜索失败' + error.toString());
        }
    }

    async toggleLikes(req, res) {
        try {

            let userID = req.user._id
            let blogID = req.query.id

            await blogService.toggleLikes(userID, blogID)

            res.status(200).send('toggleLikesOk');

        } catch (error) {
            res.status(500).send('点赞失败' + error.toString());
        }
    }

    async addComment(req, res) {
        try {
            let { name: username, _id: userid } = req.user
            let { context, blogID } = req.body

            let comment = await blogService.addComment({ context, username, userid }, blogID)

            res.status(200).send(comment);

        } catch (error) {
            res.status(500).send('留言失败' + error.toString());
        }

    }
}


module.exports = BlogController