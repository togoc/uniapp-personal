
const FileService = require('../services/file')

const fileService = new FileService()

class FileController {

    async saveBlogImg(req, res) {
        try {
            const user = req.user;
            const busboy = req.busboy;
            req.pipe(busboy);

            await fileService.saveBlogImg(user, busboy, req)

        } catch (error) {

        }
    }

}


module.exports = FileController