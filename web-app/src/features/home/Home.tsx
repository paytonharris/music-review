import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from './Home.module.css';
import { selectUserInfo } from '../../authSlice';
import {
  searchAlbums,
  selectAlbumSearchResults,
} from '../albumSearch/albumSearchSlice';

export function Home() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate(`/search/${encodeURIComponent(searchInput)}`);
  }

  return (
    <div>
      <h1>Album Liner</h1>
      <h3>Write notes and reviews of your music</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={handleTextChange}
        />
        <input value='Search' type='submit' />
      </form>
    </div>
  );
}
