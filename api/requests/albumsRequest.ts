import axios from "axios";
import { Request, Response } from 'express';

interface AlbumResult {
  id: string;
  albumName: string;
  artistName: string;
  image?: ImageLink;
}

interface ImageLink {
  url: string;
  height: number;
  width: number;
}

export const getAlbums = async (request: Request, response: Response, spotifyBearerAuthToken: string) => {
  const albumQuery = request.query.q

  console.log(albumQuery);
  console.log(spotifyBearerAuthToken);

  const url = `https://api.spotify.com/v1/search?q=${albumQuery}&type=album&limit=10`;

  const spotifyResponse = await axios.get(url, {
    headers: {
    'Authorization': `Bearer ${spotifyBearerAuthToken}`,
  }});

  let data = await spotifyResponse.data

  let albums: AlbumResult[] = [];
  if (data.albums?.items) {

    const mediumSizedImageIndex = 1;

    for (let i = 0; i < data.albums?.items?.length; i++) {

      const artist = data.albums?.items[i]?.artists[0]?.name || 'Unknown Artist';
      const album = data.albums?.items[i]?.name || 'Unknown Album';
      const id = data.albums?.items[i]?.id || 'idnotfound'; // TODO: make 'idnotfound' a randomly generated string of characters and numbers.
      const image = data.albums?.items[i]?.images[mediumSizedImageIndex] || undefined;

      albums.push({
        albumName: album,
        artistName: artist,
        id,
        image,
      });
    }

    response.status(200).json(albums);
  } else {
    response.status(500).send('Something went wrong. Please try again later.');
  }
};