const BlogService = require('../services/blog')
const blogService = new BlogService()
const { spawn } = require('child_process');
const path = require('path')


class BlogController {
  //刷新统计数据
  async refreshStatistics(req, res) {
    try {
      /**
       * 开启另外一个线程去计算所有博客分类信息
       */
      let filePath = path.resolve(__dirname, '../bin/computed_types_count.js')
      const bat = spawn(process.env.NODE_PATH, [filePath]);
      bat.on('exit', (code) => {
        if (code === 1) {
          console.log(`初始化数据成功! 子进程退出，退出码 ${code}`)
        }
        res.status(200).send({ ok: 1 });
      });
      // bat.stdout.on('data', function(data) {
      //   console.log(data.toString())
      // })
    } catch (error) {
      res.status(500).send(error.toString());
    }
  }

  // 管理 获取博客统计信息
  async getStatistics(req, res) {
    try {

      let statistics = await blogService.getStatistics()

      res.status(200).send(statistics);

    } catch (error) {
      res.status(500).send(error.toString());
    }
  }

  // 首页分类列表
  async getTypesList(req, res) {
    try {

      let types = await blogService.getTypesList()

      res.status(200).send(types);

    } catch (error) {
      res.status(500).send(error.toString());
    }
  }

  // 编辑页面 分类列表
  async getTypes(req, res) {
    try {

      let types = await blogService.getTypes()

      res.status(200).send(types);

    } catch (error) {
      res.status(500).send(error.toString());
    }
  }

  async delete(req, res) {
    try {
      let { id } = req.params
      let { _id } = req.user

      let msg = await blogService.delete(id, _id)

      res.status(200).send(msg);

    } catch (error) {
      res.status(500).send(error.toString());
    }
  }

  async getMyliked(req, res) {
    try {
      let { _id } = req.user

      let blogs = await blogService.getMyliked(_id)

      res.status(200).send(blogs);

    } catch (error) {
      res.status(500).send(error.toString());
    }
  }

  async addBlog(req, res) {
    try {
      let { body, user } = req


      let blog = await blogService.addBlog(body, user)

      res.status(200).send(blog);

    } catch (error) {

      res.status(500).send(error.toString());

    }
  }

  async editBlog(req, res) {
    try {
      let { body, user } = req


      let blog = await blogService.editBlog(body, user)

      res.status(200).send(blog);

    } catch (error) {

      res.status(500).send(error.toString());

    }
  }

  async getMyBlog(req, res) {
    try {

      let { _id } = req.user
      console.log(req.query)

      let blogs = await blogService.getMyBlog(_id, req.query)

      res.status(200).send(blogs);

    } catch (error) {
      res.status(500).send(error.toString());
    }
  }

  async getIndexBlog(req, res) {
    try {

      let blogs = await blogService.getIndexBlog(req.query)

      res.status(200).send(blogs);

    } catch (error) {
      res.status(500).send(error.toString());
    }
  }

  async getThumbnails(req, res) {
    try {
      console.log(req.params)
      let blogID = req.params.id

      let thumbnails = await blogService.getThumbnails(blogID)

      res.status(200).send(thumbnails);

    } catch (error) {

      res.status(500).send(error.toString());
    }
  }

  async search(req, res) {
    try {

      let { keyword } = req.query

      let blogs = await blogService.search(keyword.trim())

      res.status(200).send(blogs);

    } catch (error) {
      res.status(500).send('搜索失败' + error.toString());
    }
  }

  async toggleLikes(req, res) {
    try {

      let userID = req.user._id
      let { id, key } = req.query

      let blog = await blogService.toggleLikes(userID, id, key)

      res.status(200).send(blog);

    } catch (error) {
      res.status(500).send('点赞失败' + error.toString());
    }
  }

  async addComment(req, res) {
    try {
      let { name: username, _id: userid } = req.user
      let { context, blogID } = req.body

      let comment = await blogService.addComment({ context, username, userid }, blogID)

      res.status(200).send(comment);

    } catch (error) {
      res.status(500).send('留言失败' + error.toString());
    }

  }

  async delComment(req, res) {
    try {
      let { _id: userid } = req.user
      let { id } = req.body

      let comment = await blogService.delComment({ id, userid })

      res.status(200).send(comment);

    } catch (error) {
      res.status(500).send('留言失败' + error.toString());
    }

  }
}


module.exports = BlogController