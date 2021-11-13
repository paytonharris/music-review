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

type SpotifyGetRequest = (request: Request, response: Response, spotifyBearerAuthToken: string) => Promise<number>;

var spotifyBearerAuthToken = "";

const refreshBearerToken = async () => {
  try {
    const newToken = await getBearerToken(spotifyBasicAuthToken)
    if (newToken) {
      spotifyBearerAuthToken = newToken;
      return newToken;
    }
  }
  catch (error) {
    console.error(error);
  }
}

// this function will attempt a spotify request that you give it, and if the auth token expired, refreshes it and tries the request again.
const makeSpotifyRequest = async (request: Request, response: Response, requestFunction: SpotifyGetRequest) => {
  try {
    const requestStatusCode = await requestFunction(request, response, spotifyBearerAuthToken);

    if (requestStatusCode == 401) {
      console.log(`401 received, token = ${spotifyBearerAuthToken}`)
      const newToken = await refreshBearerToken()
  
      if (newToken) {
        console.log(`retrying. token = ${spotifyBearerAuthToken}`)
        requestFunction(request, response, newToken);
      }
    }
  }
  catch (error) {
    console.error(error);
  }
}

app.get('/albums', (request: Request, response: Response) => makeSpotifyRequest(request, response, getAlbums));

refreshBearerToken();
var port = process.env.PORT || 5000;

var server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});