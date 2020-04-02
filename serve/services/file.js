
const mongoose = require('../db/mongoose')
const conn = mongoose.connection;
const sharp = require("sharp");
const concat = require("concat-stream")
const imageCheck = require('./fileUtils/IMGChecker')
const removeChunks = require('./fileUtils/removeChunks')
const Thumbnail = require('../models/thumbnail')





class FileService {

    async upLoad(user, busboy, req) {
        return new Promise((resolve) => {
            busboy.on('file', async function (fieldname, file, filename, encoding, mimetype) {
                let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
                    chunkSizeBytes: 1024 * 255
                });

                const user = req.user
                const type = req.query.type //blogIMG

                const metadata = {
                    ownerID: String(user._id),
                    thumbnailID: "",
                    blogID: "",
                    hasThumbnail: false,
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

                    console.log(file)

                    if (imageCheck(filename)) {

                        try {

                            let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
                                chunkSizeBytes: 1024 * 255
                            });

                            let readeStream = bucket.openDownloadStreamByName(filename)

                            const imageResize = sharp().resize(100).on("error", (e) => {

                                console.log("resize error", e);

                            })

                            let concatStream = concat(async (imgBuffer) => {
                                function BufferToBase64(buffer) {
                                    return "data:image/*;base64," + buffer.toString('base64');
                                }
                                let thumbnail = new Thumbnail({
                                    filename,
                                    ownerID: String(user._id),
                                    data: BufferToBase64(imgBuffer),
                                    type
                                })

                                await thumbnail.save()

                                await conn.db.collection("fs.files")
                                    .findOneAndUpdate({ "_id": file._id }, { "$set": { "metadata.hasThumbnail": true, "metadata.thumbnailID": String(thumbnail._id) } })

                                resolve(thumbnail)

                            })

                            readeStream.pipe(imageResize).pipe(concatStream)

                        } catch (error) {
                            console.error(error)
                            resolve(file)
                        }
                    } else {

                        resolve(file)
                    }


                })


            });
        })

    }

}



// setTimeout(() => {
//     let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
//         chunkSizeBytes: 1024 * 255
//     });

//     let readeStream = bucket.openDownloadStreamByName('下载.jpeg')

//     const imageResize = sharp().resize(300).on("error", (e) => {

//         console.log("resize error", e);

//     })

//     let concatStream = concat(async (imgBuffer) => {
//         let thumbnail = new Thumbnail({
//             name: 'test',
//             owner: 'test',
//             data: imgBuffer
//         })
//         await thumbnail.save()

//         fs.writeFileSync('./test.jpg',imgBuffer)

//     })

//     readeStream.pipe(imageResize).pipe(concatStream)

//     console.log(imageResize)
// }, 2500);

// setTimeout(() => {
//     Thumbnail.findOne({ _id: '5e80dea413c4d741f0cb371d' }).then(res => {
//     // fs.writeFileSync('./test.jpg', Buffer.from(res.data))
//     })
// }, 1000);

module.exports = FileService