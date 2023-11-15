const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    artists: {
        type: String,
    },
    album: {
        type: String,
    },
    preview_url: {
        type: String,
    },
    isFavorite: {
        type: Boolean,
    },
    image: {
        type: String,
    },
    songId: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Song', songSchema);