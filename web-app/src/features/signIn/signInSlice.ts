import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface SignInState {
}

const initialState: SignInState = {
};

export const selectSignInState = (state: RootState) => state.signUpSlice.status;

export const signUpSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  }
});

export default signUpSlice.reducer;
