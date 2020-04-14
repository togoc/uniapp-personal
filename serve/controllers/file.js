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

    async video(req, res) {
        try {

            let fileID = req.params.id;
            let headers = req.headers

            await fileService.video(fileID, headers, res);


        } catch (error) {
            res.status(500).send('视频获取错误' + error.toString());
        }
    }

    async addFolder(req, res) {
        try {
            let { user, query } = req


            let folder = await fileService.addFolder(user, query)

            res.send(folder);

        } catch (error) {
            res.status(500).send('新建文件夹错误' + error.toString());
        }
    }

    async getFolderAndFile(req, res) {
        try {
            let { folderID } = req.query

            let folder = await fileService.getFolderAndFile(req.user, folderID)

            res.status(200).send(folder);

        } catch (error) {
            res.status(500).send('获取内容错误' + error.toString());
        }
    }

    async deleteFolderAndFile(req, res) {
        console.log(req.body)
        try {
            let body = req.body
            await fileService.deleteFolderAndFile(body)
            res.send('删除文件夹文件成功');
        } catch (error) {
            res.status(500).send('删除文件夹文件错误' + error.toString());
        }

    }

    async renameFolderAndFile(req, res) {
        try {
            let body = req.body
            await fileService.renameFolderAndFile(body)
            res.send('重命名文件夹文件成功');
        } catch (error) {
            res.status(500).send('重命名文件夹文件错误' + error.toString());
        }

    }
}


module.exports = FileController