import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export const selectAlbumInfo = (state: RootState, albumId: string) => {
  console.log(`album requested: ${albumId}`);

  return state.albumSearch.results.find(element => element.id === albumId)
};

export const albumSearch = createSlice({
  name: 'review',
  initialState: {},
  reducers: {},
});

export default albumSearch.reducer;
