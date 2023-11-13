const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET_KEY;

const jwtToken = (user) => {

    const payload = {
        id: user.id,
        userName: user.userName,
    };

    const options = { expiresIn: "1h" };

    const token = jwt.sign(payload, secret, options);

    return token;
}

module.exports = jwtToken;