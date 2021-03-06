const Blog = require('../models/blog')
const SpecialInfo = require('../models/specialInfo')
const Counts = require('../models/usercount')
const Type = require('../models/articleType')
const User = require('../models/user')
const ObjectID = require('mongodb').ObjectID
const removeFile = require('../db/utils/removeFile')
  //   // 用于修改后期数据
  // async function foo() {
  //   let users = await User.find({})
  //   let counts = await Counts.find({})
  //   counts.forEach(async(v) => {
  //     for (let i = 0; i < users.length; i++) {
  //       if (String(v.userid) === String(users[i]._id)) {
  //         v.blog_count = users[i].blog_count
  //         await v.save()
  //       }
  //     }
  //   })
  // }
  // setTimeout(() => {
  //   foo()
  // }, 2000);

class BlogService {
  //刷新统计数据
  async refreshStatistics(res) {
    return { ok: 1 }
  }

  // 管理 获取博客统计信息
  async getStatistics() {
    //  随时间新建博客数量
    let createdAt = await Blog.find({}, { createdAt: -1 }).limit(50)
      // 用户收藏排行
    let likes = await Blog.find({
        likes_length: {
          $gt: 0
        }
      }, {
        likes_length: 1,
        title: 1
      }).limit(100).sort({ likes_length: -1 })
      // 博客观看排行
    let views = await Blog.find({
        views: {
          $gt: 0
        }
      }, { views: -1, title: 1 }).limit(10).sort({ views: -1 })
      // 用户发布排行
    let counts = await Counts.find({
      // 用户太少暂时不做筛选
      blog_count: {
        $gt: -1
      }
    }, { blog_count: -1, username: 1 }).limit(10).sort({ blog_count: -1 })
    return { createdAt, likes, views, counts }

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

    let blog = await Blog.add({...context, username, userid })

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

  /**
   * 
   * @param { ObjectID } userID 用户的id
   * @param { Object } param rs:是否重置  l:已有长度   n:需要加载几条 ob:{key:排序的参数,o:1升序}排序方式 
   */
  async getMyBlog(userID, query) {
    if (Object.keys(query).length > 0) {
      // 带参数
      let { rs, l, n, ob = {} } = query
      let { key, o } = ob

      return Number(rs) || Number(l) === 0 ?
        // 重置
        await Blog.find({ userid: userID }).sort({
          [key]: o
        }).skip(0).limit(Number(n) || 10) :
        // 非重置
        await Blog.find({ userid: userID }).sort({
          [key]: Number(o)
        }).skip(Number(l)).limit(Number(n) || 10)
    } else {
      // 不带参数
      return await Blog.find({ userid: userID })
    }
  }

  async search(keyword) {
    return await Blog.find({ $text: { $search: keyword } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } }).limit(100)
  }

  async toggleLikes(userID, blogID, key) {

    let blog = await Blog.findOne({ _id: blogID })

    return await blog.toggleLikes_thumbs(userID, key)

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