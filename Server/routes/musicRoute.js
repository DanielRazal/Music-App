const express = require('express');
const axios = require('axios');
const router = express.Router();
const getAccessToken = require('../token/getToken');
const asyncHandler = require("../helpers/asyncHandler");

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
                isPlaying: false,
                currentTime: 0
            };
        });

        res.send(tracks);
    } catch (error) {
        console.error('Error searching tracks:', error.message);
        res.status(500).send('Internal Server Error');
    }
}));

module.exports = router;

