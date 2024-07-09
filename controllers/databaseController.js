const File = require("../models/fileModel");
const asyncHandler = require('express-async-handler')

//@desc Get all files info
//@route GET /api/getfilesinfo
//@access Public
const getFilesInfo = asyncHandler(async (req, res) => {
    const files = await File.find();
    if (!files) {
        return res.status(500);
    }
    res.status(200).json(fileInfo);
});

//@desc Get file info
//@route GET /api/getfileinfo/:id
//@access Public
const getFileInfo = async (req, res) => {
    const fileInfo = await File.findById(req.params.id);
    if(!fileInfo) {
        return res.status(404).json({message : "file not found"})
    }
    res.status(200).json(fileInfo);
};

//@desc Update file info
//@route Update /api/updatefileinfo/:id
//@access Public
const updateFileInfo = async (req, res) => {
    const { fieldname,
        originalname,
        encoding,
        mimetype,
        destination,
        filename,
        path,
        size} = req.file;
    const fileInfo = await File.findById(req.params.ID);
    if(!fileInfo) {
        return res.status(404).json({ message : "file not found"})
    }
    fileInfo.fieldname = fieldname || fileInfo.fieldname;
    fileInfo.originalname = originalname || fileInfo.originalname;
    fileInfo.encoding = encoding || fileInfo.encoding;
    fileInfo.mimetype = mimetype || fileInfo.mimetype;
    fileInfo.destination = destination || fileInfo.destination;
    fileInfo.filename = filename || fileInfo.filename;
    fileInfo.path = path || fileInfo.path;
    fileInfo.size = size || fileInfo.size;

    await fileInfo.save();
    res.status(200).json(fileInfo);
};

//@desc create new file
//@route POST /uploadFileInfo
//@access Public
const createFileInfo = async (req, res) => {
    const { fieldname,
        originalname,
        encoding,
        mimetype,
        destination,
        filename,
        path,
        size} = req.file;


    const file = await File.create({ 
        fieldname,
        originalname,
        encoding,
        mimetype,
        destination,
        filename,
        path,
        size
    });
    if (!file) {
        return res.status(500).json({ message : "could not upload file"});
    }
    res.status(200).json({ message : "file created successfully"});
};


//@desc delete a files
//@route GET /api/deleteFileInfo/:id
//@access Public
const deleteFileInfo = asyncHandler(async (req, res) => {

    const file = await File.findById(req.params.id);
    if (!file) {
        return res.status(500);
    }
    await file.deleteOne();
    res.status(200).json({ message : "file deleted successfully"});
});

module.exports = {createFileInfo,
    getFilesInfo,
    getFileInfo,
    updateFileInfo,
    deleteFileInfo
}