import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { searchAlbumsViaSpotify } from './albumSearchAPI';

export interface AlbumSearchState {
  status: 'initial' | 'succeeded' | 'loading' | 'failed';
  results: AlbumResult[];
}

export interface AlbumResult {
  id: string;
  albumName: string;
  artistName: string;
  image?: ImageLink;
}

export interface ImageLink {
  url: string;
  height: number;
  width: number;
}

const initialState: AlbumSearchState = {
  status: 'initial',
  results: [],
};

export const searchAlbums = createAsyncThunk(
  'albumSearch/search',
  async (searchText: string) => {
    const response = await searchAlbumsViaSpotify(searchText);
    
    return response;
  }
);

export const selectAlbumSearchResults = (state: RootState) => state.albumSearch.results;

export const albumSearch = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchAlbums.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchAlbums.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(searchAlbums.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      });
  },
});

export default albumSearch.reducer;
