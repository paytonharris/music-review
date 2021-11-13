import dotenv from "dotenv";
import express, { Request, Response } from 'express';
import cors from "cors";
import axios from "axios";
import { getAlbums } from './requests/albumsRequest';
import { getBearerToken } from './requests/tokenRequest';

dotenv.config();
const spotifyBasicAuthToken = process.env.MUSIC_REVIEW_API_SPOTIFY_KEY;
if (!spotifyBasicAuthToken) {
  throw 'missing spotify auth token environment variable "MUSIC_REVIEW_API_SPOTIFY_KEY".';
}

var app = express();
app.use(cors());

var spotifyBearerAuthToken = "";

getBearerToken(spotifyBasicAuthToken)
  .then(token => {
    if (token) spotifyBearerAuthToken = token;
  })
  .catch(error => console.error(error))

app.get('/albums', (request: Request, response: Response) => getAlbums(request, response, spotifyBearerAuthToken));

var port = process.env.PORT || 5000;

var server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});