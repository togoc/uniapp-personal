
const ObjectID = require('mongodb').ObjectID
const conn = require('../mongoose').connection
/**
 * 删除用户多余的头像,仅保留当前的头像
 * @param {String} ownerID 
 * @param {String} saveFileID 
 */
const removeAvatar = async (ownerID, saveFileID) => {

    let avatars = await conn.db.collection("fs.files").find({
        "metadata.ownerID": ObjectID(ownerID), "metadata.type": 'avatar', _id: {
            $ne: ObjectID(saveFileID)
        }
    }).toArray()


    avatars.forEach(async v => {
        await conn.db.collection("fs.files").deleteOne({ _id: ObjectID(v._id) })
        await conn.db.collection("fs.chunks").deleteMany({ files_id: ObjectID(v._id) })
    })
}


module.exports = removeAvatar