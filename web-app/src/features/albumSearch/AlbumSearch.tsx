import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  searchAlbums,
  selectAlbumSearchResults,
} from './albumSearchSlice';
import styles from './AlbumSearch.module.css';

interface CurrentUser {
  user?: any
  loadingState: 'loading' | 'success' | 'failure'
}

export function AlbumSearch() {
  const dispatch = useAppDispatch();
  const albumSearchResults = useAppSelector(selectAlbumSearchResults);
  const [searchInput, setSearchInput] = useState('');
  const [currentUser, setCurrentUser] = useState<CurrentUser>({ loadingState: 'loading' })

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (searchInput.length > 0) {
      dispatch(searchAlbums(searchInput));
    }
  }

  const getUser = async () => {
    try {
      if (currentUser.loadingState !== 'loading') {
        setCurrentUser({ loadingState: 'loading' })
      }

      const userInfo = await Auth.currentUserInfo();

      setCurrentUser({ user: userInfo, loadingState: 'success' })
    }
    catch (error) {
      console.error(error);
      setCurrentUser({ loadingState: 'failure' })
    }
  }

  const onPressSignOut = () => {
    try {
      Auth.signOut();
    }
    catch (error) {
      console.error(error)
    }
    finally {
      getUser(); // update screen to show that no one is logged in. 
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
      {currentUser.user?.username ? 
        <div>
          <p>hello user!</p>
          <p>{JSON.stringify(currentUser)}</p>
          <button onClick={onPressSignOut}>Log out</button>
        </div>
      : (currentUser.loadingState === 'loading' ?
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
              <Link to={`album/${albumResult.id}`}>
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
