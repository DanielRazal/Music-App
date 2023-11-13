const express = require('express')
const app = express();
const cors = require("cors");
const musicRoute = require('./routes/musicRoute');
const userRoute = require('./routes/userRoutes');
const mongoose = require('mongoose');
const Urls = require("./settings/staticUrls");
const bodyParser = require('body-parser');


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

app.use(bodyParser.json());


const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));


const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true, 
};

app.use(cors(corsOptions));

app.use('/Music', musicRoute);
app.use('/User', userRoute);



app.listen(Urls.serverPort, () => {
    console.log(
        `Server is running at ${Urls.serverDomain}:${Urls.serverPort}`
    )
})