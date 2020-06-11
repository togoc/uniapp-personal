
const ObjectID = require('mongodb').ObjectID
const conn = require('../../db/mongoose').connection
/**
 * 删除用户多余的头像,仅保留当前的头像
 * @param {String} fileid 
 */
const removeAvatar = async (saveFileID) => {

    await conn.db.collection("fs.files").deleteOne({ _id: ObjectID(saveFileID) })
    await conn.db.collection("fs.chunks").deleteMany({ files_id: ObjectID(saveFileID) })

}


module.exports = removeAvatar