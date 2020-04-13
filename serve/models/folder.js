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
    files: [
        {
            type: {
                type: String,
                default: "folder"
            },
            path: {
                type: String
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
            createdAt: {
                type: Number,
                default: Date.now
            },
        }
    ],
    folderpath: {
        type: String,
        trim: true,
        default: path.join("/")
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
    let folder = await Folder.findOne({ "files.type": "folder", "files.path": body.folderpath })

    if (folder) {
        throw new Error('已存在相同目录')
    }

    let newFolder = new Folder(body)
    this.files = [...this.files, { name: path.basename(body.folderpath), path: body.folderpath }]
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
