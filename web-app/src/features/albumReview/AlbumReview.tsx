import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  selectAlbumInfo,
} from './albumReviewSlice';
import styles from './AlbumReview.module.css';
import { useParams } from "react-router-dom";

export function AlbumReview() {
  const { albumId } = useParams();

  const album = useAppSelector(state => selectAlbumInfo(state, albumId ?? ""))

  return (
    <div className={styles.main}>
      {album && 
      <div className={styles.albumInfo}>
        <h2>{album.artistName}</h2>
        <h2>{album.albumName}</h2>
        <img alt='album cover' src={album.image?.url}></img>
      </div>
      }
    </div>
  );
}
