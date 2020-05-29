const Blog = require('../models/blog')
const SpecialInfo = require('../models/specialInfo')
const Counts = require('../models/usercount')
const Type = require('../models/articleType')
const ObjectID = require('mongodb').ObjectID
const removeFile = require('../db/utils/removeFile')


class BlogService {
  // 管理 获取博客统计信息
  async getStatistics() {
    let createdAt = await Blog.find({}, ['createdAt']).limit(100)
    let views = await Blog.find({}, { likes: 1 }).limit(100)

    return { createdAt, views }

  }

  // 首页分类列表
  async getTypesList() {

    return await Type.find({}, ['name', 'num', 'likes_num']).sort({ num: -1 }).limit(10)

  }


  async getTypes() {

    return await Type.find({}, ['name', 'num']).sort({ num: -1 })

  }




  async delete(blogId, userId) {

    return await Blog.delete(blogId, userId)

  }


  async getMyliked(id) {
    return await Blog.find({ "likes": { "$in": [ObjectID(id)] } })
  }


  async editBlog(body, user) {

    let { context = {}, tags = [] } = body

    // let { name: username, _id: userid } = user

    let { _id, types } = context

    //文章类型引用标记
    await Type.add(types)

    let blog = await Blog.findOneAndUpdate({ _id: ObjectID(_id) }, {
      ...context
    })

    let thumbnails = await removeFile(context, tags, blog._id)

    blog.thumbnails = thumbnails

    return await blog.save()

  }

  async addBlog(body, user) {
    //tags 包含了{src,file_id}
    let { context = {}, tags = [] } = body

    //文章类型引用标记
    let { types } = context
    await Type.add(types)

    let { name: username, _id: userid } = user

    let blog = new Blog({...context, username, userid })

    let thumbnails = await removeFile(context, tags, blog._id)

    blog.thumbnails = thumbnails

    return await blog.save()

  }

  // 根据类名返回文章 / 根据 id 返回 
  async getIndexBlog({ id, type, key }) {

    if (id) {
      let targetBlog = await Blog.findOne({ _id: id })
      await targetBlog.addViews()
      return await targetBlog
    } else if (type) {
      // 指定类名返回含有特殊信息的内容
      let blogs = await Blog.find({ "types": { "$in": [type] } }, { updatedAt: 0, delta: 0, delta: 0 })
      let specialInfo = await SpecialInfo.findOne({ name: type })
      return { blogs, specialInfo }
    } else if (key) {
      // 根据其他特殊获取
      const KEYFORM = {
        async hot() {
          return await Blog.find({}, { updatedAt: 0, delta: 0, delta: 0 }).sort({ "views": -1 }).limit(8)
        },
        async new() {
          return await Blog.find({}, { updatedAt: 0, delta: 0, delta: 0 }).sort({ "createdAt": -1 }).limit(8)
        },
      }
      return KEYFORM[key] ? await KEYFORM[key]() : await Blog.find({})
    } else {
      // return await Blog.find({}).skip(Number(page)).limit(pageSize)
      return await Blog.find({}, { updatedAt: 0, delta: 0, delta: 0 })
    }

  }

  async getMyBlog(userID, page) {
    let pageSize = 10
      // return await Blog.find({ userid: userID }).skip(Number(page)).limit(pageSize)
    return await Blog.find({ userid: userID })
  }

  async search(keyword) {
    return await Blog.find({ $text: { $search: keyword } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } }).limit(100)
  }

  async toggleLikes(userID, blogID) {

    let blog = await Blog.findOne({ _id: blogID })

    return await blog.toggleLikes(userID)

  }

  async addComment(context, id) {
    let blog = await Blog.findOne(ObjectID(id))

    return await blog.addComment(context)

  }

  async delComment({ id, userid }) {
    let blog = await Blog.findOne({
      "comments._id": ObjectID(id),
      "comments.userid": ObjectID(userid),
    })

    return await blog.delComment(id)

  }
}



module.exports = BlogService