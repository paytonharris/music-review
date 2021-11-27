import axios from "axios";
import { Request, Response } from 'express';

interface DetailedAlbumResult {
  id: string;
  albumName: string;
  artistName: string;
  image?: ImageLink;
  largeImage?: ImageLink;
  releaseDate?: string;
}

interface ImageLink {
  url: string;
  height: number;
  width: number;
}

export const getAlbumInfo = async (request: Request, response: Response, spotifyBearerAuthToken: string) => {
  let responseCode = 0;

  try {
    const ids = request.query.q

    console.log(ids);

    const url = `https://api.spotify.com/v1/albums?ids=${ids}`; // has a limit of 20 IDs.

    const spotifyResponse = await axios.get(url, {
      headers: {
      'Authorization': `Bearer ${spotifyBearerAuthToken}`,
    }});

    responseCode = spotifyResponse.status;

    let data = spotifyResponse.data

    let albums: DetailedAlbumResult[] = [];
    if (data.albums) {

      const mediumSizedImageIndex = 1;
      const largeSizedImageIndex = 0;

      for (let i = 0; i < data.albums?.length; i++) {

        const artist = data.albums[i]?.artists[0]?.name || 'Unknown Artist';
        const album = data.albums[i]?.name || 'Unknown Album';
        const id = data.albums[i]?.id || 'idnotfound'; // TODO: make 'idnotfound' a randomly generated string of characters and numbers.
        const image = data.albums[i]?.images[mediumSizedImageIndex] || undefined;
        const largeImage = data.albums[i]?.images[largeSizedImageIndex] || undefined;
        const releaseDate = data.albums[i]?.releaseDate || undefined;

        albums.push({
          albumName: album,
          artistName: artist,
          id,
          image,
          largeImage,
          releaseDate,
        });
      }

      response.status(200).json(albums);
    }
  }
  catch (error: any) {
    if (error.response) {
      responseCode = error.response.status;
    }

    console.error(error);
  }
  finally {
    return responseCode;
  }
};