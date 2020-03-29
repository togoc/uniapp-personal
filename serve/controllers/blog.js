
const BlogService = require('../services/blog')

const blogService = new BlogService()

class BlogController {
    async addBlog(req, res) {
        try {
            let { body, user } = req
            console.log(user)
            let { name, _id } = user
            body = { ...body, username: name, userid: _id }

            await blogService.addBlog(body)

            res.send('保存成功(saved)!');

        } catch (error) {

            res.status(500).send(error.toString());

        }

    }

    async editBlog(req, res) {

    }

}


module.exports = BlogController