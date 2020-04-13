const express = require('express');
const router = express.Router();

const FileController = require('../controllers/file')
const auth = require('../middleware/auth')
const fileController = new FileController()


router.post('/upload', auth, fileController.upLoad);
router.get('/img/:id', fileController.img);
router.get('/video/:id', fileController.video);
router.get('/add-folder', auth, fileController.addFolder);
router.get('/get-folder-file', auth, fileController.getFolderAndFile);
// router.get('/delete', auth, fileController.delete);

module.exports = router;



