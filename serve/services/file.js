const ObjectID = require('mongodb').ObjectID
const mongoose = require('../db/mongoose')
const conn = mongoose.connection;
const sharp = require("sharp");
const imageCheck = require('./fileUtils/IMGChecker')
const videoChecker = require('./fileUtils/videoChecker')
const removeChunks = require('./fileUtils/removeChunks')
const removeAvatar = require('../db/utils/removeAvatar')
const fs = require('fs')
const path = require('path')
const Folder = require('../models/folder')
const env = require('../enviroment/env')
const deleteMyFile = require('./fileUtils/removeMyfile')


class FileService {

    async upLoad(busboy, req) {
        return new Promise((resolve) => {
            busboy.on('file', async function (fieldname, file, filename, encoding, mimetype) {
                let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
                    chunkSizeBytes: 1024 * 255
                });

                let user = req.user
                const { type, folderID } = req.query //blogIMG

                const metadata = {
                    ownerID: user._id,
                    blogID: "",
                    type,
                    createdAt: Date.now,
                    isVideo: videoChecker(filename),
                    isImg: imageCheck(filename),
                }

                let bucketStream = bucket.openUploadStream(filename, { metadata })

                bucketStream.on("error", async (e) => {
                    resolve(file)
                    await removeChunks(bucketStream);
                    throw new Error('SaveBlogImg BucketStream Error')
                })

                req.on("aborted", async () => {

                    console.log("Upload Request Cancelling...");

                    await removeChunks(bucketStream);

                })

                file.pipe(bucketStream)

                // file:数据库保存后的内容
                bucketStream.on("finish", async (file) => {

                    if (imageCheck(filename) && type !== 'file') {

                        let _id = file._id
                        let src = env.fullUrl + '/blog/file-service/img/' + _id


                        switch (type) {
                            case 'avatar':
                                user.avatar = src
                                await user.save()
                                await removeAvatar(user._id, _id)
                                break;

                            default:
                                break;
                        }

                        resolve({
                            file_id: _id,
                            src
                        })

                    }

                    if (type === 'file') {
                        let folder = await Folder.findOne({ _id: ObjectID(folderID) })
                        let type = ""
                        if (imageCheck(filename)) {
                            type = 'image'
                        }
                        if (videoChecker(filename)) {
                            type = 'video'
                        }

                        let src = env.fullUrl + '/blog/file-service' + (type === 'image' ? '/img/' : '/video/') + bucketStream.id

                        let body = {
                            type,
                            name: filename,
                            fileid: bucketStream.id,
                            src
                        }
                        let foldersave = await folder.addFile(body)


                        resolve(foldersave)
                    }
                    resolve(file)
                })


            });
        })

    }

    async img(w, h, id, res) {

        return new Promise((resolve, reject) => {
            let readeStream = null
            console.log(id)
            if (id === 'default.png') {
                readeStream = fs.createReadStream(path.resolve(__dirname, '../public/images/default.png'))
            } else {
                let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
                    chunkSizeBytes: 1024 * 255
                });

                readeStream = bucket.openDownloadStream(ObjectID(id))

            }


            if (!(w && h)) {
                w = 100
                h = 100
            }

            const imageResize = sharp().resize(Number(w), Number(h)).on("error", (e) => {
                throw new Error("resize error", e);
            })

            readeStream.pipe(imageResize).pipe(res)

            readeStream.on('error', function (error) {
                reject(error)
            })

            readeStream.on('finish', async (file) => {
                resolve(file)
            })
        })

    }

    async video(id, headers, res) {

        return new Promise(async (resolve, reject) => {
            let currentFile = await conn.db.collection("fs.files").findOne(ObjectID(id))
            if (!currentFile || !headers.range) {
                console.log(1)
                reject('无文件或者无效range\\id:' + id)
                return
            }
            let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
                chunkSizeBytes: 1024 * 255
            });

            const fileSize = currentFile.length
            const range = headers.range
            const parts = range.replace(/bytes=/, "").split("-")
            let start = parseInt(parts[0], 10)
            let end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1

            const chunksize = (end - start) + 1

            let head = {
                'Content-Range': 'bytes ' + start + '-' + end + '/' + fileSize,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4'
            }


            let readeStream = bucket.openDownloadStream(ObjectID(id), {
                start,
                end: end.length
            })
            res.writeHead(206, head);

            readeStream.pipe(res)

            readeStream.on('error', function (error) {
                reject(error)
            })

            readeStream.on('finish', async (file) => {
                resolve(file)
            })
        })
    }

    async addFolder(user, query) {

        let { _id: userid, name: username } = user
        let { CurrentFolderID, NewFolderName } = query
        let body = { userid, username, foldername: NewFolderName }

        let folder = await Folder.findOne({ userid: ObjectID(userid), _id: ObjectID(CurrentFolderID) })

        if (folder) {
            return await folder.addFolder(body)
        } else {
            throw new Error('当前目录有误')
        }

    }

    async getFolderAndFile(user, folderID) {
        let folder = await Folder.findOne({ userid: ObjectID(user._id), root: true })
        //第一次没有目录
        if (!folder && !folderID) {
            let newFolder = new Folder({
                userid: user._id,
                username: user.name,
                root: true
            })
            return await newFolder.save()
        } else if (folder && !folderID) {
            return folder

        } else {
            let folder = await Folder.findOne({ userid: ObjectID(user._id), _id: folderID })
            if (folder) {
                return folder
            } else {
                throw new Error('目录有误')
            }
        }
    }

    async deleteFolderAndFile(file) {
        if (file.CurrentFolderID) {
            await Folder.updateOne({ _id: ObjectID(file.CurrentFolderID) }, {
                $pull: {
                    files: { _id: ObjectID(file._id) }
                }
            })
        }

        if (file.type === 'folder') {
            let deleteBack = await Folder.findOneAndDelete({ _id: ObjectID(file.folderid) })
            if (deleteBack && deleteBack.files) {
                deleteBack.files.forEach(async v => {
                    await this.deleteFolderAndFile(v)
                })
            }
        } else {
            await deleteMyFile(file.fileid)
        }
    }

    async renameFolderAndFile(file) {
        let newName = file.newName
        await Folder.updateOne({ _id: ObjectID(file.CurrentFolderID), 'files._id': ObjectID(file._id) }, {
            $set: {
                'files.$.name': newName
            }
        })
        //未对文件重命名
        if (file.type === 'folder') {
            let folder = await Folder.updateOne({ _id: ObjectID(file.folderid) }, { foldername: newName })
        }
    }

    async downloadFile(fileID, res) {
        let currentFile = await conn.db.collection("fs.files").findOne(ObjectID(fileID))

        let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
            chunkSizeBytes: 1024 * 255
        });
        let head = {
            'Content-Length': currentFile.length,
        }

        let readeStream = bucket.openDownloadStream(ObjectID(fileID))
        res.set('Content-Type', 'application/octet-stream');
        res.set('Content-Disposition', 'attachment; filename="' + 'index.mp4' + '"');
        res.set('Content-Length', currentFile.length);

        readeStream.pipe(res)
    }
}





module.exports = FileService