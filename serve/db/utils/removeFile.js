const conn = require('../mongoose').connection
const ObjectID = require('mongodb').ObjectID

const removeFile = async (context, tags, blogID) => {
    let thumbnails = []
    tags.forEach(async v => {
        if (context.html.indexOf(v.src) === -1) {
            await conn.db.collection("fs.files").deleteOne({ _id: ObjectID(v.file_id) })
            await conn.db.collection("fs.chunks").deleteMany({ files_id: ObjectID(v.file_id) })
        } else {
            thumbnails.push(v)
            await conn.db.collection("fs.files").findOneAndUpdate({ _id: ObjectID(v.file_id) }, { "$set": { 'metadata.blogID': ObjectID(blogID) } })
        }
    })

    return thumbnails
}

module.exports = removeFile


