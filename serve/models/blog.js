const mongoose = require('mongoose')
const nodejieba = require("nodejieba");


const blogSchema = mongoose.Schema({
    userid: {
        type: String,
        trim: true,
        require: true
    },
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
        require: true
    },
    text: {
        type: String,
        trim: true,
        require: true,
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
    thumbnails: {
        type: Array
    },
    likes: [],
    views: {
        type: Number,
        default: 0
    },
    comments: [
        {
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
        }
    ],
    createdAt: {
        type: Number
    },
    updatedAt: {
        type: Number
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})



blogSchema.pre('save', async function (next) {

    const blog = this

    if (blog.isModified('html')) {
        blog.html = blog.html.replace(/\<img/gi,
            '<img style="max-width:50%;height:auto"').replace(/```.*?```/ig, function (e) {
                return '<div style="background-color:#f6f8fa;border: 5px solid #f1f8ff;padding: 3px;font-size: 14px;"><code>' + e.replace(/&nbsp;/ig, "").replace(/```|<p.*?>|<\/p>/ig, '').replace(/;/ig, ";<br>") + '</code></div>'
            })
    }

    if (blog.isModified('text')) {
        blog.text = nodejieba.cut((blog.text.trim().replace(/```/ig, "") + blog.title), true).join(' ')
    }

    next()
})


blogSchema.methods.addViews = async function () {

    this.views = this.views + 1

    await this.save()

}

blogSchema.methods.toggleLikes = async function (userID) {

    let likes = this.likes

    if (likes.includes(userID)) {
        this.likes.splice(likes.indexOf(userID), 1)
        return await this.save()
    } else {
        this.likes = [...this.likes, userID]
        return await this.save()
    }

}

blogSchema.methods.addComment = async function (comment) {

    let comments = this.comments

    this.comments = [...comments, comment]

    return await this.save()

}



blogSchema.index({ title: "text", text: "text" })

const Blog = mongoose.model('blogs', blogSchema)



module.exports = Blog
