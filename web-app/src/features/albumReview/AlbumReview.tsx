import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  selectAlbumInfo,
} from './albumReviewSlice';
import styles from './AlbumReview.module.css';
import { useParams, useNavigate } from "react-router-dom";
import { DataStore } from '@aws-amplify/datastore';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { Review } from '../../models/index';
import { selectUserInfo } from '../../authSlice';
import { createReview } from '../../graphql/mutations';
import { listReviews, searchReviews } from '../../graphql/queries';

export function AlbumReview() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const album = useAppSelector(state => selectAlbumInfo(state, albumId ?? ""))
  const userInfo = useAppSelector(selectUserInfo);

  const getPreviousReviews = async () => {
    try {
      var reviews = await API.graphql(graphqlOperation(listReviews))

      console.log("Posts retrieved successfully!", JSON.stringify(reviews, null, 2));
    } catch (error) {
      console.log("Error fetching reviews", error);
    }
  }

  const getFilteredPreviousReviews = async () => {
    try {
      var reviews = await API.graphql({
        query: searchReviews,
        variables: { filter: { albumID: { match: albumId } } }
      })

      console.log("Searched matching albums", JSON.stringify(reviews, null, 2));
    } catch (error) {
      console.log("Error fetching reviews", error);
    }
  }

  const getReviewsByAlbumID = async () => {
    const filter = { albumID: { eq: albumId } }

    try {
      var reviews = await API.graphql({
        query: listReviews,
        variables: { filter: filter }
      })

      console.log("Searched matching albums", JSON.stringify(reviews, null, 2));
    } catch (error) {
      console.log("Error fetching reviews", error);
    }
  }

  const getUser = async () => {
    const user = await Auth.currentUserInfo()

    const userID = user?.attributes?.sub;
    const name = user?.attributes?.name;
  }

  useEffect(() => {
    // getPreviousReviews();
    // getFilteredPreviousReviews();
    getReviewsByAlbumID();

    getUser();
  }, [])

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (reviewText.length > 0) {
      saveReviewRemotely();
    }
  }

  const saveReviewRemotely = async () => {
    const newReview = {
      date: (new Date()).toISOString(),
      body: reviewText,
      albumID: albumId,
      albumName: album?.albumName,
      artistName: album?.artistName,
      userID: userInfo.id,
      reviewerName: userInfo.name
    }

    if (userInfo.id) {
      try {
        await API.graphql({
          query: createReview,
          variables: { input: newReview },
          authMode: "AMAZON_COGNITO_USER_POOLS"
        })
        console.log("Post saved successfully!");
      } catch (error) {
        console.log("Error saving post", error);
      }
    }
    else {
      console.log("user is not logged in, could not save.")
    }
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className={styles.main}>
      <button onClick={goBack}>{"< Albums"}</button>
      {album && 
      <div className={styles.albumInfo}>
        <h2>{album.artistName}</h2>
        <h2>{album.albumName}</h2>
        <img alt='album cover' src={album.image?.url}></img>
        <form onSubmit={handleSubmit}>
          <p>Review</p>
          <input
            type="text"
            value={reviewText}
            onChange={handleTextChange}
          />
          <input value='Save' type='submit' />
        </form>
      </div>
      }
      <p>{JSON.stringify(reviews)}</p>
    </div>
  );
}
