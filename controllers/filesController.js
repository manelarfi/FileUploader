const path = require('path');
const fs = require('fs');
const asyncHandler = require('express-async-handler');
const File = require('../models/fileModel');

//@desc Retrieve all files
//@route GET /api/files
//@access Public
const getFiles = (req, res) => {
    const directoryPath = path.join(__dirname, '../public/uploads');
    
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ files, message: 'Files retrieved successfully' });
    });
};

//@desc Retrieve a file by ID
//@route GET /api/files/:id
//@access Public
const getFile = async (req, res) => {
    const fileId = req.params.id;

    try {
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        const filePath = path.join(__dirname, '../public/uploads', file.filename);
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).json({ error: 'File not found' });
            }

            res.sendFile(filePath, (err) => {
                if (err) {
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.json({ message: 'File sent successfully' });
                }
            });
        });
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//@desc Upload a new file
//@route POST /upload
//@access Public
const addFile = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('Uploaded file:', req.file);
    res.status(201).json({ message: 'File uploaded successfully', file: req.file });
});

//@desc Delete a file
//@route DELETE /delete/:id
//@access Public
const deleteFile = asyncHandler(async (req, res) => {
    const fileId = req.params.id;

    try {
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        const filePath = path.join(__dirname, '../public/uploads', file.filename);
        fs.unlink(filePath, async (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete file' });
            }

            try {
                await file.remove();
                res.status(200).json({ message: 'File deleted successfully' });
            } catch (err) {
                return res.status(500).json({ error: 'Failed to delete file record' });
            }
        });
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = {
    addFile,
    getFiles,
    getFile,
    deleteFile
};
