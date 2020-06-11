const mongoose = require('mongoose')
const validator = require('validator')
const ObjectID = require('mongodb').ObjectID

const todos = mongoose.Schema({

    task: {
        type: String,
        required: true,
        trim: true
    },

    userid: {
        type: ObjectID,
        required: true,
        trim: true
    },

    done: {
        type: Boolean,
        default: false
    }
    ,
    createdAt: {
        type: Number
    },
    updatedAt: {
        type: Number
    },
}, {
    timestamps: true
})


const Todos = mongoose.model("todos", todos);

module.exports = Todos;