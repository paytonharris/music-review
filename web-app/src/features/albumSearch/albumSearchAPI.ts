import { AlbumResult } from "./albumSearchSlice";

export async function searchAlbumsViaSpotify(searchText = '') {
  try {
    if (searchText.length === 0) {
      return Promise.reject('No search value was provided.');
    }

    const url = `http://musicreviewapi-env.eba-zpuuemc2.us-east-1.elasticbeanstalk.com/albums?q=${encodeURIComponent(searchText)}`

    const response = await fetch(url);
    let data = await response.json()
    if (response.ok && data) {

      let albums: AlbumResult[] = data;

      return albums;
    }
    throw new Error(response.statusText)
  } catch (err: any) {
    return Promise.reject(err.message ? err.message : 'an http error occurred')
  }
}
