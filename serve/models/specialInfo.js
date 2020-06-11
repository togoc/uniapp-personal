const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID

const SpecialSchema = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        unique: true
    },
    swipers: [
        {
            img_url: String,
            path: String,
            tips: String
        }
    ]
})







const Special = mongoose.model('specialinfos', SpecialSchema)

module.exports = Special
