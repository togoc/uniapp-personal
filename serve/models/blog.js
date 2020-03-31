const mongoose = require('mongoose')


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
    thumbnails: [
        {
            thumbnailID: {
                type: String
            }
        }
    ],
    like: {
        type: Number,
        default: 0
    },
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
    ]
}, {
    timestamps: true
})


blogSchema.pre('save', async function (next) {
    const blog = this



    next()
})



const Blog = mongoose.model('blogs', blogSchema)



module.exports = Blog