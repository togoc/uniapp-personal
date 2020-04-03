
const Blog = require('../models/blog')
const Thumbnail = require('../models/thumbnail')
const mongoose = require('../db/mongoose')
const conn = mongoose.connection;
class BlogService {
    async addBlog(body, user) {
        let { context, tags } = body
        let { name, _id } = user

        context = { ...context, username: name, userid: _id }

        let thumbnails = []

        tags.forEach(async (v, i) => {
            if (context.html.indexOf(v.srcData) === -1) {
                await Thumbnail.deleteOne({ _id: v.thumbnailID, ownerID: user._id })
                const file = await conn.db.collection("fs.files").findOne({
                    "metadata.ownerID": String(_id),
                    "metadata.thumbnailID": v.thumbnailID
                })
                await conn.db.collection("fs.files").deleteOne({ _id: file._id })
                await conn.db.collection("fs.chunks").deleteMany({ files_id: file._id })
                delete tags[i]
            } else {
                thumbnails.push({
                    thumbnailID: v.thumbnailID
                })
            }
        })

        let blog = new Blog({ ...context, thumbnails })

        tags.forEach(async (v, i) => {
            await Thumbnail.updateOne({ _id: v.thumbnailID }, { blogID: blog._id })
        })



        await blog.save()

    }

    async getIndexBlog(page, id) {
        console.log(page)
        let pageSize = 10
        if (id) {
            return await Blog.findOne({ _id: id })
        } else {
            return await Blog.find({}, ['like', 'comments', 'title', 'username', 'text', 'updatedAt']).skip(Number(page)).limit(pageSize)
        }

    }

    async getMyBlog(userID, page) {
        let pageSize = 10
        return await Blog.find({ userid: userID }, ['like', 'comments', 'title', 'username', 'text', 'updatedAt']).skip(Number(page)).limit(pageSize)
    }


    async getThumbnails(blogID) {
        console.log(blogID)
        return await Thumbnail.find({ blogID })
    }

}



module.exports = BlogService


