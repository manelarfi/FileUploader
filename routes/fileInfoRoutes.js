const express = require('express');
const router = express.Router();
const { 
    getFilesInfo,
    getFileInfo,
    updateFileInfo,
 } = require('../controllers/databaseController');

router.get('/getfilesinfo', getFilesInfo)
router.get('/getfileinfo/:id', getFileInfo)
router.put('/updatefileinfo/:id', updateFileInfo)


module.exports = router