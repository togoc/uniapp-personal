const mongoose = require("mongoose");

const thumbnailSchema = new mongoose.Schema({

    filename: {
        type: String,
        required: true,
    },
    ownerID: {
        type: String,
        required: true
    },

    data: {
        type: String,
        required: true
    },
    type: {
        type: String
    },

    blogID: {
        type: String
    }

}, {
    timestamps: true
})

const Thumbnail = mongoose.model("thumbnails", thumbnailSchema);

module.exports = Thumbnail;



