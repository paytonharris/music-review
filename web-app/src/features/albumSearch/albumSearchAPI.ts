import { nanoid } from "@reduxjs/toolkit";
import { AlbumResult } from "./albumSearchSlice";

export async function searchAlbumsViaSpotify(searchText = '') {
  try {
    if (searchText.length === 0) {
      return Promise.reject('No search value was provided.');
    }

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchText)}&type=album&limit=10`

    const response = await fetch(url, {
        headers: {
        'Authorization': 'Bearer TOKEN_HERE',
      }}
    )
    let data = await response.json()
    if (response.ok && data.albums?.items) {

      let albums: AlbumResult[] = []
      const mediumSizedImageIndex = 1;

      for (let i = 0; i < data.albums?.items?.length; i++) {

        const artist = data.albums?.items[i]?.artists[0]?.name || 'Unknown Artist';
        const album = data.albums?.items[i]?.name || 'Unknown Album';
        const id = data.albums?.items[i]?.id || nanoid();
        const image = data.albums?.items[i]?.images[mediumSizedImageIndex] || undefined

        albums.push({
          albumName: album,
          artistName: artist,
          id,
          image,
        });
      }

      return albums;
    }
    throw new Error(response.statusText)
  } catch (err: any) {
    return Promise.reject(err.message ? err.message : 'an http error occurred')
  }
}
