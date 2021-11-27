import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  searchAlbums,
  selectAlbumSearchResults,
} from './albumSearchSlice';
import styles from './AlbumSearch.module.css';
import { selectUserInfo } from '../../authSlice';

export function AlbumSearch() {
  const dispatch = useAppDispatch();
  const albumSearchResults = useAppSelector(selectAlbumSearchResults);
  const userInfo = useAppSelector(selectUserInfo);
  const { query } = useParams();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(decodeURIComponent(query || ''));

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (searchInput.length > 0) {
      dispatch(searchAlbums(searchInput));
      navigate(`/search/${encodeURIComponent(searchInput)}`);
    }
  }

  const onClickSignOut = () => {
    try {
      Auth.signOut();
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const searchText = decodeURIComponent(query || '');

    if (searchText.length > 0) {
      dispatch(searchAlbums(searchText));
      setSearchInput(searchText)
    }
  }, [query])

  return (
    <div className={styles.container}>
      {userInfo?.name ? 
        <div>
          <p>{`Hello, ${userInfo.name?.split(' ')[0] || 'user'}!`}</p>
          <button onClick={onClickSignOut}>Log out</button>
        </div>
      : (userInfo.status === 'loading' || userInfo.status === 'initial' ?
        <div>
          <p>loading...</p>
        </div>
        :
        <div>
          <Link to="/SignUp">Sign Up</Link>
          <Link to="/LogIn">Log In</Link>
        </div>
      )
      }
      <Link to="/reviews">Reviews</Link>
      <p>Albums</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={handleTextChange}
        />
        <input value='Search' type='submit' />
      </form>
      <div className={styles.albumGrid}>
        {albumSearchResults.map(albumResult => {
          return (
            <div className={styles.albumResult} id={albumResult.id}>
              <Link to={`/album/${albumResult.id}`}>
                <p>{albumResult.artistName} - {albumResult.albumName}</p>
                <img alt='album cover' src={albumResult?.image?.url}></img>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  );
}
