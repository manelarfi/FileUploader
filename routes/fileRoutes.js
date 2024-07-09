const express = require('express');
const router = express.Router();
const upload = require("../middlewares/upload.js");
const {
    addFile,
    getFiles,
    getFile,
    deleteFile
} = require('../controllers/filesController.js')
const {
    createFileInfo,
    deleteFileInfo
} = require('../controllers/databaseController.js')

router.get('/', getFiles)
router.get('/:id', getFile)
router.post('/upload', upload.single('file'), createFileInfo, addFile, )
router.delete('/deleteFile/:id', deleteFileInfo,deleteFile )

module.exports = router;