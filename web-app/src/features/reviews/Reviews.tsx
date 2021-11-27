import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useParams, useNavigate, Link } from "react-router-dom";
import { DataStore } from '@aws-amplify/datastore';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { Review } from '../../models/index';
import { selectUserInfo } from '../../authSlice';
import { searchReviews } from '../../graphql/queries';
import styles from './Reviews.module.css';
import { ImageLink } from '../albumSearch/albumSearchSlice';

export interface AlbumInfo {
  albumName: string;
  artistName: string;
  id: string;
  image?: ImageLink;
  largeImage?: ImageLink;
  releaseDate?: string;
}

export interface ReviewAndAlbum {
  review: Review;
  albumInfo?: AlbumInfo;
}

export function Reviews() {
  const [reviews, setReviews] = useState<ReviewAndAlbum[]>([]);
  const userInfo = useAppSelector(selectUserInfo);

  const getUserReviews = async () => {
    try {
      var reviews: any = await API.graphql({
        query: searchReviews,
        variables: { filter: { userID: { match: userInfo.id } } }
      })

      var reviewsRetrieved: ReviewAndAlbum[] = []
      var albumIDs: string[] = []

      reviews?.data?.searchReviews?.items?.forEach((review: Review) => {
        reviewsRetrieved.push({ review });

        if (review.albumID) {
          albumIDs.push(review.albumID)
        }
      })

      console.log("Searched matching albums", JSON.stringify(reviews, null, 2));
      setReviews(reviewsRetrieved);

      getAlbumInfo(albumIDs, reviewsRetrieved);
    } catch (error) {
      console.log("Error fetching reviews", error);
    }
  }

  const getAlbumInfo = async (albumIDs: string[], currentReviews: ReviewAndAlbum[]) => {
    try {
      if (albumIDs.length > 20) {
        console.error("albuminfo endpoint is limited to 20 albums, but more than 20 were requested at once.")
      }
  
      var idList = albumIDs.reduce((prev, curr) => `${prev},${curr}`)
      console.log(idList)
  
      const url = `https://d40mp7e4qp37w.cloudfront.net/albuminfo?q=${encodeURIComponent(idList)}`
  
      const response = await fetch(url);
      let data: AlbumInfo[] = await response.json()
      if (data) {
        console.log("got the album info")
        console.log(JSON.stringify(data, null, 2))

        let newReviewAndAlbums = [...currentReviews];

        for (const reviewAndAlbum of newReviewAndAlbums) {
          for (const info of data) {
            if (reviewAndAlbum.review.albumID === info.id) {
              reviewAndAlbum.albumInfo = info;
            }
          }
        }

        setReviews(newReviewAndAlbums);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserReviews();
  }, [userInfo])

  return (
    <div className={styles.main}>
      {reviews.map((reviewAndInfo) => {
        return (
          <div className={styles.review} key={reviewAndInfo.review.id}>
            <div className={styles.leftContainer}>
              {reviewAndInfo.albumInfo?.largeImage?.url && <img className={styles.albumCover} alt='album cover' src={reviewAndInfo.albumInfo?.largeImage?.url}></img>}
            </div>
            <div className={styles.rightContainer}>
              <h2 className={styles.artist}>{reviewAndInfo.review.artistName}</h2>
              <Link className={styles.album} to={`/album/${reviewAndInfo.review.albumID}`}>
                <h3 className={styles.album}>{reviewAndInfo.review.albumName}</h3>
              </Link>
              {reviewAndInfo.review.reviewerName && 
                <p className={styles.writer}>Review by {reviewAndInfo.review.reviewerName}</p>
              }
              {reviewAndInfo.review.title && <strong>{reviewAndInfo.review.title}</strong>}
              <p className={styles.body}>{reviewAndInfo.review.body}</p>
              {reviewAndInfo.review.rating && <p>{reviewAndInfo.review.rating}</p>}
            </div>
          </div>
        )
      })}
    </div>
  );
}
