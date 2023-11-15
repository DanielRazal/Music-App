const express = require('express');
const axios = require('axios');
const router = express.Router();
const getAccessToken = require('../token/getToken');
const asyncHandler = require("../helpers/asyncHandler");
const Song = require('../models/song');
const mongoose = require('mongoose');

require('dotenv').config();

// Search tracks route
router.get('/search/:keyword', asyncHandler(async (req, res) => {

    const { keyword } = req.params;

    try {
        const accessToken = await getAccessToken();

        const searchOptions = {
            url: 'https://api.spotify.com/v1/search',
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            params: {
                q: keyword,
                type: 'track',
            },
        };

        const response = await axios(searchOptions);

        const tracks = response.data.tracks.items.map(item => {
            return {
                id: item.id,
                name: item.name,
                artists: item.artists.map(artist => artist.name).join(', '),
                album: item.album.name,
                preview_url: item.preview_url,
                image: item.album.images.length > 0 ? item.album.images[0].url : null,
            };
        });
        res.send(tracks);
    } catch (error) {
        console.error('Error searching tracks:', error.message);
        res.status(500).send('Internal Server Error');
    }
}));


router.delete('/', async (req, res) => {
    try {
        // Use deleteMany to delete all documents in the 'songs' collection
        const result = await Song.deleteMany({});

        console.log(`${result.deletedCount} songs deleted.`);

        res.send(`${result.deletedCount} songs deleted.`);
    } catch (error) {
        console.error('Error deleting songs:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/:userId', asyncHandler(async (req, res) => {
    const { id, name, artists, album, preview_url, isFavorite, image, songId } = req.body;
    const { userId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send('Invalid user ID.');
        }

        const userIdAsObjectId = mongoose.Types.ObjectId(userId);

        // Check if a song with the given songId and userId already exists
        const existingSong = await Song.findOne({ songId, user: userIdAsObjectId });

        if (existingSong) {
            // If the song already exists, send a response indicating that it's not added again
            return res.status(200).send('Song already exists for the user, not added again.');
        }

        // If isFavorite is true and the song doesn't exist, add the song to MongoDB
        const newSong = new Song({
            id,
            name,
            artists,
            album,
            preview_url,
            isFavorite,
            image,
            songId,
            user: userIdAsObjectId,
        });

        await newSong.save();

        res.status(201).send('Song added to favorites!');
    } catch (error) {
        console.error('Error adding song to favorites:', error.message);
        res.status(500).send('Internal Server Error');
    }
}));

module.exports = router;

