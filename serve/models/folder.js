const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID
const path = require('path')


const folderSchema = mongoose.Schema({
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
    root: {
        type: Boolean,
        default: false
    },
    files: [
        {
            type: {
                type: String,
                default: "folder"
            },
            src: {
                type: String
            },
            name: {
                type: String
            },
            fileid: {
                type: ObjectID
            },
            folderid: {
                type: ObjectID
            },
            createdAt: {
                type: Number,
                default: Date.now
            },
        }
    ],
    foldername: {
        type: String,
        trim: true,
        default: "root"
    },
    createdAt: {
        type: Number
    },
    updatedAt: {
        type: Number
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})



folderSchema.methods.addFolder = async function (body) {
    let file = this.files.filter(v => v.name === body.foldername)

    if (file.length) {
        throw new Error('已存在相同目录')
    }

    let newFolder = new Folder(body)

    this.files = [...this.files, { name: newFolder.foldername, folderid: newFolder._id }]
    await this.save()

    return await newFolder.save()
}

folderSchema.methods.addFile = async function (body) {


    this.files = [...this.files, { ...body }]

    return await this.save()
}


folderSchema.index({ path: 1 })


const Folder = mongoose.model('filepaths', folderSchema)

module.exports = Folder
