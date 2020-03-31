
const Blog = require('../models/blog')
const Thumbnail = require('../models/thumbnail')
class BlogService {
    async addBlog(body, user) {
        let { context, tags } = body
        let thumbnails = []
        
        tags.forEach(async (v, i) => {
            if (context.html.indexOf(v.thumbnailID) === -1) {
                await Thumbnail.deleteOne({ _id: thumbnailID, ownerID: user._id })
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

}



module.exports = BlogService

function removeThumbnail() {
    return new Promise((resolve) => {

    })
}