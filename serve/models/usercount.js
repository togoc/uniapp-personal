const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID

const CountSchema = mongoose.Schema({
    userid: {
        type: ObjectID,
        require: true,
        unique: true
    },
    //关注的人
    focus: [{
        userid: {
            type: ObjectID,
            require: true,
            trim: true
        }
    }],
    //粉丝
    fans: [{
        userid: {
            type: ObjectID,
            trim: true,
            require: true
        }
    }],
    //访问总数(根据访问总数查询排名)
    blog_read_count: {
        type: Number,
        default: 0
    },
    //用户信息查看总数
    user_read_count: {
        type: Number,
        default: 0
    }
})


CountSchema.statics.addReadCount = async (userid) => {
    
    let count = await Counts.findOne({ userid: ObjectID(userid) })

    count.blog_read_count = count.blog_read_count + 1

    return count.save()
}




const Counts = mongoose.model('usercounts', CountSchema)

module.exports = Counts
