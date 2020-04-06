const ObjectID = require('mongodb').ObjectID
const mongoose = require('../db/mongoose')
const conn = mongoose.connection;
const sharp = require("sharp");
const fs = require('fs')
const concat = require("concat-stream")
const imageCheck = require('./fileUtils/IMGChecker')
const removeChunks = require('./fileUtils/removeChunks')
const removeAvatar = require('../db/utils/removeAvatar')
const Thumbnail = require('../models/thumbnail')
const env = require('../enviroment/env')



class FileService {

    async upLoad(busboy, req) {
        return new Promise((resolve) => {
            busboy.on('file', async function (fieldname, file, filename, encoding, mimetype) {
                let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
                    chunkSizeBytes: 1024 * 255
                });

                let user = req.user
                const type = req.query.type //blogIMG

                const metadata = {
                    ownerID: user._id,
                    blogID: "",
                    type
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

                    if (imageCheck(filename)) {

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

                    } else {
                        resolve(file)
                    }
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

}




module.exports = FileService