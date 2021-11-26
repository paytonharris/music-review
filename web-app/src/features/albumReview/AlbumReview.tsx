import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  selectAlbumInfo,
} from './albumReviewSlice';
import styles from './AlbumReview.module.css';
import { useParams, useNavigate } from "react-router-dom";
import { DataStore } from '@aws-amplify/datastore';
import { Review } from '../../models/index';
import { selectUserInfo } from '../../authSlice';

export function AlbumReview() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const album = useAppSelector(state => selectAlbumInfo(state, albumId ?? ""))
  const userInfo = useAppSelector(selectUserInfo);

  const getPreviousReviews = async () => {
    try {
      const previewReviews = await DataStore.query(Review);
      console.log("Posts retrieved successfully!", JSON.stringify(previewReviews, null, 2));
      setReviews(previewReviews);
    } catch (error) {
      console.log("Error retrieving posts", error);
    }
  }

  const getFilteredPreviousReviews = async () => {
    try {
      const previewReviews = await DataStore.query(Review, c => 
        c.albumID("eq", album?.id || ''),
        {
          sort: s => s.date("DESCENDING")
        }
      );
      console.log("Filtered posts retrieved successfully!", JSON.stringify(previewReviews, null, 2));
    } catch (error) {
      console.log("Error retrieving posts", error);
    }
  }

  useEffect(() => {
    getPreviousReviews();
    getFilteredPreviousReviews();
  }, [])

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (reviewText.length > 0) {
      saveReview();
    }
  }

  const saveReview = async () => {

    if (userInfo.id) {
      try {
        await DataStore.save(
          new Review({
            date: (new Date()).getTime(),
            body: reviewText,
            albumID: albumId,
            albumName: album?.albumName,
            artistName: album?.artistName,
            userID: userInfo.id,
          })
        );
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
