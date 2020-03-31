
const FileService = require('../services/file')

const fileService = new FileService()

class FileController {

    async upLoad(req, res) {
        try {
            const user = req.user;
            const busboy = req.busboy;

            req.pipe(busboy);

            let file = await fileService.upLoad(user, busboy, req)

            res.send(file);
        } catch (error) {

            res.status(500).send(error.toString());
        }
    }

}


module.exports = FileController