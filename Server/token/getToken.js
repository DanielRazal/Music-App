require('dotenv').config();
const axios = require('axios');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const spotifyToken = process.env.SPOTIFY_TOKEN;

// Get access token function
async function getAccessToken() {
    const authString = `${clientId}:${clientSecret}`;
    const authBase64 = Buffer.from(authString, 'utf-8').toString('base64');

    const authOptions = {
        url: spotifyToken,
        method: 'post',
        headers: {
            'Authorization': 'Basic ' + authBase64,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
            grant_type: 'client_credentials',
        },
    };

    try {
        const response = await axios(authOptions);
        return response.data.access_token;
    } catch (error) {
        throw new Error('Error fetching access token: ' + error.message);
    }
}


module.exports = getAccessToken