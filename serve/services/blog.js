
const Blog = require('../models/blog')

class BlogService {
    async addBlog(body) {

        let blog = new Blog(body)

        await blog.save()
        
    }

}



module.exports = BlogService
