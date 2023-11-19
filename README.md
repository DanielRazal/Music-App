# Music-App

Developed using **Angular, NodeJs and MongoDb**.\
I built a **music app** using Spotify API. Users can search, listen, and add songs to favorites on separate page.\
It provides details like artists, album, and previews.

## Running the Project

To run the **"Music-App"** project, execute the following commands:

### Server (NodeJs):

1. Install server dependencies: **npm i**
2. Start the server using nodemon: **nodemon app**

### Client (Angular):

1. Install client dependencies: **npm i**
2. Start the Angular app: **ng serve**

### MongoDB Configuration:

1. In the server directory, locate the `.env` file.

2. Open the **`.env`** file and replace the placeholder for the MONGODB_URI with the appropriate URL for your MongoDB server.\
It should look something like this: **DATABASE_URL=mongodb://127.0.0.1:27017/Spotify**

3. You also need to add all of these to the **.env**:\
**SECRET_KEY=my_secret_key\
LOCAL_HOST=http://localhost\
SPOTIFY_SEARCH=https://api.spotify.com/v1/search\
SPOTIFY_TOKEN=https://accounts.spotify.com/api/token**\

4. You need to connect to a Spotify developer account and get your token and add them to **.env**:
**CLIENT_ID=your_client_id**
and
**CLIENT_SECRET=your_client_secret**




