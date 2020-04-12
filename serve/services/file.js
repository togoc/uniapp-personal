const ObjectID = require('mongodb').ObjectID
const mongoose = require('../db/mongoose')
const conn = mongoose.connection;
const sharp = require("sharp");
const imageCheck = require('./fileUtils/IMGChecker')
const videoChecker = require('./fileUtils/videoChecker')
const removeChunks = require('./fileUtils/removeChunks')
const removeAvatar = require('../db/utils/removeAvatar')
const Folder = require('../models/folder')
const env = require('../enviroment/env')
const path = require('path')



class FileService {

    async upLoad(busboy, req) {
        return new Promise((resolve) => {
            busboy.on('file', async function (fieldname, file, filename, encoding, mimetype) {
                let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
                    chunkSizeBytes: 1024 * 255
                });

                let user = req.user
                const { type, folderpath, folderID } = req.query //blogIMG

                const metadata = {
                    ownerID: user._id,
                    blogID: "",
                    type,
                    createdAt: Date.now,
                    folderpath,
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
                            _id,
                            src
                        })

                    }

                    if (type === 'file') {
                        let folder = await Folder.findOne({ _id: ObjectID(folderID), folderpath })
                        let type = ""
                        if (imageCheck(filename)) {
                            type = 'image'
                        }
                        if (videoChecker(filename)) {
                            type = 'video'
                        }
                        let body = {
                            type,
                            path: path.join(folderpath, filename),
                            name: filename,
                            fileid: bucketStream.id
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
            let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
                chunkSizeBytes: 1024 * 255
            });

            let readeStream = bucket.openDownloadStream(ObjectID(id))

            if (!(w && h)) {
                w = 300
                h = 300
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
        let { CurrentFolderName, NewFolderName } = query
        let body = { userid, username, folderpath: path.join(CurrentFolderName, NewFolderName) }
        let folder = await Folder.findOne({ userid: ObjectID(userid), folderpath: CurrentFolderName })
        if (folder) {
            return await folder.addFolder(body)
        } else {
            throw new Error('当前目录有误')
        }

    }

    async getFolderAndFile(user, folderPath) {
        let folder = await Folder.findOne({ userid: ObjectID(user._id), folderpath: path.join("/") })
        //第一次没有目录
        if (!folder) {
            let newFolder = new Folder({
                userid: user._id,
                username: user.name,
            })
            return await newFolder.save()
        } else {
            let folder = await Folder.findOne({ userid: ObjectID(user._id), folderpath: path.join(folderPath) })
            if (folder) {
                return folder
            } else {
                throw new Error('目录有误')
            }
        }
    }
}




module.exports = FileService