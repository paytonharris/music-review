import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  searchAlbums,
  selectAlbumSearchResults,
} from './albumSearchSlice';
import styles from './AlbumSearch.module.css';

export function AlbumSearch() {
  const dispatch = useAppDispatch();
  const albumSearchResults = useAppSelector(selectAlbumSearchResults);
  const [searchInput, setSearchInput] = useState('');

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (searchInput.length > 0) {
      dispatch(searchAlbums(searchInput));
    }
  }

  return (
    <div>
      <p>Albums</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={handleTextChange}
        />
        <input value='Search' type='submit' />
      </form>
      {albumSearchResults.length > 0 ? <label>Results:</label> : null}
      <div className={styles.albumGrid}>
        {albumSearchResults.map(albumResult => {
          return (
            <div className={styles.albumResult} id={albumResult.id}>
              <p>{albumResult.artistName} - {albumResult.albumName}</p>
              <img alt='album cover' src={albumResult?.image?.url}></img>
            </div>
          )
        })}
      </div>
    </div>
  );
}
