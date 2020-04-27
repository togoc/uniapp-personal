const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID

const typeSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    userid: {
        type: ObjectID,
        trim: true,
        require: true

    },
    username: {
        type: String,
        trim: true,
        require: true,
    },
    num: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
})


typeSchema.statics.add = async (types) => {
    types.forEach(async v => {
        let type = await Types.findOne({ name: v })
        if (type) {
            type.num += 1
            await type.save()
        } else {
            Types.insertMany([{ name: v }])
        }
    })


}

typeSchema.pre('save', function (next) {
    console.log(this)

    next()
})

typeSchema.index({ num: -1 })


const Types = mongoose.model('articletypes', typeSchema)

module.exports = Types
