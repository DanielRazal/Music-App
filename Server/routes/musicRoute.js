const express = require('express');
const axios = require('axios');
const router = express.Router();
const getAccessToken = require('../token/getToken');
const asyncHandler = require("../helpers/asyncHandler");
const Song = require('../models/song');
const mongoose = require('mongoose');

require('dotenv').config();

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
        const result = await Song.deleteMany({});

        res.send(`${result.deletedCount} songs deleted.`);

    } catch (error) {
        console.error('Error deleting songs:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/:userId', asyncHandler(async (req, res) => {
    const { id, name, artists, album, preview_url, image } = req.body;
    let userId = req.params.userId;

    userId = userId.replace(/"/g, '');

    try {

        const existingSong = await Song.findOne({ user: userId, songId: id });

        if (existingSong) {
            return res.status(200).send({ message: 'Song is already in favorites!' });
        }

        const newSong = new Song({
            name,
            artists,
            album,
            preview_url,
            isFavorite: true,
            image,
            user: userId,
            songId: id
        });

        await newSong.save();

        res.status(201).send({ message: 'Song added to favorites!' });
    } catch (error) {
        console.error('Error adding song to favorites:', error.message);
        res.status(500).send('Internal Server Error');
    }
}));


router.patch('/:userId/:songId', asyncHandler(async (req, res) => {
    const { isFavorite } = req.body;
    let userId = req.params.userId;
    const songId = req.params.songId;
    userId = userId.replace(/"/g, '');

    try {
        const updatedSong = await Song.findOneAndUpdate(
            { user: userId, songId: songId },
            { $set: { isFavorite: isFavorite } },
            { new: true }
        );

        if (!updatedSong) {
            return res.status(404).send({ message: 'Song not found for the specified user and songId.' });
        }

        res.status(200).send({ message: 'isFavorite status updated successfully.', updatedSong });

    } catch (error) {
        console.error('Error updating isFavorite status:', error.message);
        res.status(500).send('Internal Server Error');
    }
}));

router.get('/:userId', asyncHandler(async (req, res) => {
    try {
        const userId = req.params.userId.replace(/"/g, '');

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).send({ message: 'User not found for the specified id.' });
        }

        const songs = await Song.find({ user: userId });

        res.status(200).send(songs);
    } catch (error) {
        console.error('Error retrieving songs:', error.message);
        res.status(500).send('Internal Server Error');
    }
}));


router.delete('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({ message: 'Songs not found for the specified id.' });
        }

        const deletedSong = await Song.findOneAndDelete({ _id: id });

        res.status(200).send({ message: 'Song deleted successfully.', deletedSong });

    } catch (error) {
        console.error('Error deleting song:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));


module.exports = router;

