import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useParams, useNavigate } from "react-router-dom";
import { DataStore } from '@aws-amplify/datastore';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { Review } from '../../models/index';
import { selectUserInfo } from '../../authSlice';
import { searchReviews } from '../../graphql/queries';
import styles from './Reviews.module.css';

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const userInfo = useAppSelector(selectUserInfo);

  const getFilteredPreviousReviews = async () => {
    try {
      var reviews: any = await API.graphql({
        query: searchReviews,
        variables: { filter: { userID: { match: userInfo.id } } }
      })

      var reviewsRetrieved: Review[] = []

      reviews?.data?.searchReviews?.items?.forEach((review: Review) => {
        reviewsRetrieved.push(review);
      })

      setReviews(reviewsRetrieved);

      console.log("Searched matching albums", JSON.stringify(reviews, null, 2));
    } catch (error) {
      console.log("Error fetching reviews", error);
    }
  }

  useEffect(() => {
    getFilteredPreviousReviews();
  }, [])

  return (
    <div>
      <p>your reviews</p>

      {reviews.map((review) => {
        return (
          <div className={styles.review} id={review.id}>
            <h2>{review.artistName}</h2>
            <h3>{review.albumName}</h3>
            {review.reviewerName && <p>Review by {review.reviewerName}</p>}
            {review.title && <strong>{review.title}</strong>}
            <p>{review.body}</p>
            {review.rating && <p>{review.rating}</p>}
          </div>
        )
      })}
    </div>
  );
}
