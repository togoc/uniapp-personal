const Counts = require('../models/usercount')
const mongoose = require('mongoose')
const nodejieba = require("nodejieba");
const removeFile = require('../services/fileUtils/removeMyfile')
const ObjectID = require('mongodb').ObjectID


const blogSchema = mongoose.Schema({
  userid: {
    type: String,
    trim: true,
    require: true
  },
  privated: {
    type: Boolean,
    default: false
  },
  types: [], //分类
  articleTags: [], //标签
  username: {
    type: String,
    trim: true,
    require: true
  },
  title: {
    type: String,
    trim: true,
    require: true,
    validate(value) {
      if (value.trim().length <= 0) {
        throw new Error('标题无效("title" Is Not Valid)')
      }
    }
  },
  html: {
    type: String,
    trim: true,
    require: true,
    validate(value) {
      if (value.trim().length <= 0) {
        throw new Error('内容无效("HTML" Is Not Valid)')
      }
    }
  },
  markdown: {
    type: String,
    trim: true,
    require: true,
    validate(value) {
      if (value.trim().length <= 0) {
        throw new Error('内容无效("markdown" Is Not Valid)')
      }
    }
  },
  text: {
    type: String,
    trim: true,
    validate(value) {
      if (value.trim().length <= 0) {
        throw new Error('内容无效("text" Is Not Valid)')
      }
    }
  },
  delta: {
    type: Object,
    require: true
  },
  thumbnails: [{
    src: String,
    file_id: String
  }],
  likes: [],
  likes_length: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  comments: [{
    userid: {
      type: String,
      require: true
    },
    username: {
      type: String,
      require: true
    },
    context: {
      type: String,
      trim: true,
      require: true
    },
    date: {
      type: Number,
      default: Date.now
    }
  }],
  createdAt: {
    type: Number
  },
  updatedAt: {
    type: Number
  },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})



blogSchema.pre('save', async function(next) {

  const blog = this

  //手机替换用
  // if (blog.isModified('html')) {
  //     blog.html = blog.html.replace(/\<img/gi,
  //         '<img style="max-width:50%;height:auto"').replace(/```.*?```/ig, function (e) {
  //             return '<div style="background-color:#f6f8fa;border: 5px solid #f1f8ff;padding: 3px;font-size: 14px;"><code>' + e.replace(/&nbsp;/ig, "").replace(/```|<p.*?>|<\/p>/ig, '').replace(/;/ig, ";<br>") + '</code></div>'
  //         })
  // }

  if (blog.isModified('text')) {
    blog.text = nodejieba.cut((blog.text.trim().replace(/```/ig, "") + blog.title), true).join(' ')
  }

  next()
})


blogSchema.methods.addViews = async function() {

  this.views = this.views + 1
  await Counts.addReadCount(this.userid)
  await this.save()

}

blogSchema.methods.toggleLikes = async function(userID) {

  let likes = this.likes

  if (likes.includes(userID)) {
    this.likes.splice(likes.indexOf(userID), 1)
  } else {
    this.likes = [...this.likes, userID]
  }
  this.likes_length = this.likes.length
  return await this.save()
}

// 同时图片
blogSchema.statics.delete = async function(blogId, userID) {
  // 删除内容
  let blog = await Blog.findOneAndDelete({ _id: ObjectID(blogId), userid: ObjectID(userID) })

  // 修改统计信息
  await Counts.reduceBlogCount(userID)

  if (!blog) {
    throw new Error('没有找到内容')
  }

  // 删除内容图片
  let thumbnails = blog.thumbnails
  for (let i = 0; i < thumbnails.length; i++) {
    await removeFile(thumbnails[i].file_id)
  }

  // 删除
  return { ok: 1 }

}

blogSchema.statics.add = async function(context) {

  let blog = new Blog(context)
    // 修改统计信息
  await Counts.addBlogCount(context.userid)

  return blog
}


blogSchema.methods.addComment = async function(comment) {

  let comments = this.comments

  this.comments = [...comments, comment]

  return await this.save()

}


blogSchema.methods.delComment = async function(id) {

  let comments = this.comments.filter(v => String(v._id) !== id)

  this.comments = comments

  return await this.save()

}


blogSchema.index({ title: "text", text: "text" })

const Blog = mongoose.model('blogs', blogSchema)


module.exports = Blog