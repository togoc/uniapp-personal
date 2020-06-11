const mongoose = require("mongoose");
const conn = require('../db/mongoose').connection
const thumbnailSchema = new mongoose.Schema({

    filename: {
        type: String,
        required: true,
    },
    ownerID: {
        type: String,
        required: true
    },

    data: {
        type: String,
        required: true
    },
    type: {
        type: String
    },

    blogID: {
        type: String
    }

}, {
    timestamps: true
})

thumbnailSchema.statics.removeThumbnail = async (tags, context) => {
    let thumbnails = []

    tags.forEach(async (v, i) => {
        const file = await conn.db.collection("fs.files").findOne({
            "metadata.thumbnailID": v.thumbnailID
        })
        if (context.html.indexOf(v.srcData) === -1) {
            await conn.db.collection("fs.files").deleteOne({ _id: file._id })
            await conn.db.collection("fs.chunks").deleteMany({ files_id: file._id })
        } else {
            file.metadata.blog
        }
    })

    return { thumbnails, tags }
}


thumbnailSchema.statics.addBlogId = async (tags, blog) => {

    tags.forEach(async (v, i) => {
        await Thumbnail.updateOne({ _id: v.thumbnailID }, { blogID: blog._id })
    })

}

const Thumbnail = mongoose.model("thumbnails", thumbnailSchema);




module.exports = Thumbnail;



