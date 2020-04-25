
const Blog = require('../models/blog')
const ObjectID = require('mongodb').ObjectID
const removeFile = require('../db/utils/removeFile')
class BlogService {
    async addBlog(body, user) {
        let { context = {}, tags = [] } = body

        let { name: username, _id: userid } = user

        let blog = new Blog({ ...context, username, userid })

        let thumbnails = await removeFile(context, tags, blog._id)

        blog.thumbnails = thumbnails

        return await blog.save()

    }

    async getIndexBlog(page, id) {
        let pageSize = 10
        if (id) {
            let targetBlog = await Blog.findOne({ _id: id })
            await targetBlog.addViews()
            return await targetBlog
        } else {
            return await Blog.find({}).skip(Number(page)).limit(pageSize)
        }

    }

    async getMyBlog(userID, page) {
        let pageSize = 10
        return await Blog.find({ userid: userID }).skip(Number(page)).limit(pageSize)
    }

    async search(keyword) {
        return await Blog.find({ $text: { $search: keyword } }, { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } }).limit(100)
    }

    async toggleLikes(userID, blogID) {

        let blog = await Blog.findOne({ _id: blogID })

        await blog.toggleLikes(userID)

    }

    async addComment(context, id) {
        let blog = await Blog.findOne(ObjectID(id))

        return await blog.addComment(context)

    }
}



module.exports = BlogService


