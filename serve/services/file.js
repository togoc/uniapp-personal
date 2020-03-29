
const mongoose = require('../db/mongoose')
const conn = mongoose.connection;
const sharp = require("sharp");
const concat = require("concat-stream")
const Thumbnail = require('../models/thumbnail')


class FileService {

    async saveBlogImg(user, busboy, req) {
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
                chunkSizeBytes: 1024 * 255
            });
            let bucketStream = bucket.openUploadStream(filename)

            bucketStream.on("error", async (e) => {
                throw new Error('SaveBlogImg BucketStream Error')
            })

            bucketStream.on("finish", async (file) => {
                console.log(file)
            })

            file.pipe(bucketStream)

        });
    }

}
const fs = require('fs')
// setTimeout(() => {
//     let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
//         chunkSizeBytes: 1024 * 255
//     });

//     let readeStream = bucket.openDownloadStreamByName('下载.jpeg')
//     // let writeStream = fs.createWriteStream('./test.jpg')
//     // readeStream.pipe(writeStream)
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