const ObjectID = require('mongodb').ObjectID
const Type = require('../models/articleType');
const Blog = require('../models/blog');
const User = require('../models/user');
const mongoose = require('../db/mongoose');

(async function() {
  let types = await Type.find({})
  let users = await User.find({})

  // 重新计算分类数量 与分类收藏数量
  for (let i = 0; i < types.length; i++) {
    let types_blog = await Blog.find({ types: types[i].name }, { _id: 1, likes: 1 })
    let count = types_blog.length
    if (count) {
      let change = false // 判断是否更新
      let likes_num = types_blog.reduce((pre, cur) => {
        return pre + cur.likes.length
      }, 0)
      if (likes_num !== types[i].likes_num) {
        change = true
        types[i].likes_num = likes_num
      }
      if (types[i].num !== count) {
        change = true
        types[i].num = count
      }
      if (change) {
        await types[i].save()
      }
      continue
    }
    await Type.deleteOne({ _id: ObjectID(types[i]._id) })
  }

  // 重新计算用户博客数量
  for (let i = 0; i < users.length; i++) {
    let count = await Blog.find({ userid: ObjectID(users[i]._id) }, { _id: 1 }).countDocuments()
    if (count) {
      if (users[i].blog_count !== count) {
        users[i].blog_count = count
        await users[i].save()
      }
    }
  }


  process.exit(1)

}());