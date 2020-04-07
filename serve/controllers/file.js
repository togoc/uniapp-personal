const User = require('../models/user')
const FileService = require('../services/file')

const fileService = new FileService()

class FileController {

    async upLoad(req, res) {
        try {
            const busboy = req.busboy;

            req.pipe(busboy);

            let file = await fileService.upLoad(busboy, req)

            res.send(file);

        } catch (error) {

            res.status(500).send(error.toString());
        }
    }

    async img(req, res) {
        try {
            let { w, h, byuserid } = req.query;

            let fileID = req.params.id;

            byuserid && (fileID = await User.getAvatar(fileID));


            await fileService.img(w, h, fileID, res);


        } catch (error) {
            res.status(500).send('图片获取错误' + error.toString());
        }
    }

}

console.log(process.env.DEV_HOST)

module.exports = FileController