const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID

const CountSchema = mongoose.Schema({
  blog_count: {
    type: Number,
    default: 0
  },

  userid: {
    type: ObjectID,
    require: true,
    unique: true
  },

  username: {
    type: String,
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


CountSchema.statics.addReadCount = async(userid) => {

  let count = await Counts.findOne({ userid: ObjectID(userid) })

  count.blog_read_count += 1

  return count.save()
}

CountSchema.statics.reduceBlogCount = async(userid) => {
  if (!userid) throw Error('CountSchema.statics.reduceBlogCount userid error')
  let count = await Counts.findOne({ userid: ObjectID(userid) })
  count.blog_count -= 1
  return await count.save()
}

CountSchema.statics.addBlogCount = async(userid) => {
  if (!userid) throw Error('CountSchema.statics.addBlogCount userid error')
  let count = await Counts.findOne({ userid: ObjectID(userid) })
  count.blog_count += 1
  return await count.save()
}

const Counts = mongoose.model('usercounts', CountSchema)

module.exports = Counts