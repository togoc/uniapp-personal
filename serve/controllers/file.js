
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
            let { w, h } = req.query
            let id = req.params['0']

            await fileService.img(w, h, id, res)

        } catch (error) {
            res.status(500).send('图片获取错误' + error.toString());
        }
    }

}


module.exports = FileController