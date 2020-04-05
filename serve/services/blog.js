
const Blog = require('../models/blog')
const removeFile = require('../db/utils/removeFile')
class BlogService {
    async addBlog(body, user) {
        let { context, tags } = body

        let { name: username, _id: userid } = user

        let blog = new Blog({ ...context, username, userid })

        let thumbnails = await removeFile(context, tags, blog._id)

        blog.thumbnails = thumbnails

        await blog.save()

    }

    async getIndexBlog(page, id) {
        let pageSize = 10
        if (id) {
            let targetBlog = await Blog.findOne({ _id: id })
            await targetBlog.addViews()
            return await targetBlog
        } else {
            return await Blog.find({}, ['likes', 'comments', 'title', 'username', 'text', 'views', 'updatedAt']).skip(Number(page)).limit(pageSize)
        }

    }

    async getMyBlog(userID, page) {
        let pageSize = 10
        return await Blog.find({ userid: userID }, ['likes', 'comments', 'title', 'username', 'text', 'updatedAt', 'views']).skip(Number(page)).limit(pageSize)
    }

    async search(keyword) {
        return await Blog.find({ $text: { $search: keyword } }, { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } }).limit(100)
    }

    async toggleLikes(userID, blogID) {

        let blog = await Blog.findOne({ _id: blogID })

        await blog.toggleLikes(userID)

    }

}



module.exports = BlogService


