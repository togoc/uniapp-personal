
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

}


module.exports = BlogController