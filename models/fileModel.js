const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    fieldname: {
        type: String,
        require: [true]
    },
    originalname: {
        type: String,
        required: [true, "Original file name is required"]
    },
    encoding: {
        type: String,
        require: [true]
    },
    mimetype: {
        type: String,
        require: [true]
    },
    destination: {
        type: String,
        require: [true]
    },
    filename: {
        type: String,
        required: [true, "Stored file name is required"]
    },
    path: {
        type: String,
        required: [true, "File path is required"]
    },
    size: {
        type: Number,
        required: [true, "File size is required"]
    }
});

module.exports = mongoose.model('File', fileSchema)