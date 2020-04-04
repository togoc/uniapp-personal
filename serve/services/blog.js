
const Blog = require('../models/blog')
const Thumbnail = require('../models/thumbnail')
class BlogService {
    async addBlog(body, user) {
        let { context, tags } = body
        let { name, _id } = user

        context = { ...context, username: name, userid: _id }

        let { thumbnails, tags: lastTags } = await Thumbnail.removeThumbnail(tags, context)

        let blog = new Blog({ ...context, thumbnails })

        await Thumbnail.addBlogId(lastTags, blog)

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


