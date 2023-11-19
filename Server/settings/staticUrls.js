require('dotenv').config();


const serverPortNum = 3001;
const clientPortNum = 4200;
const serverDomain = process.env.LOCAL_HOST;

const Urls = {
    serverPort: serverPortNum,
    clientPort: clientPortNum,
    serverDomain: serverDomain,
};

module.exports = Urls;