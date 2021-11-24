import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SignInState {
}

const initialState: SignInState = {
};

export const selectSignInState = (state: RootState) => state.signUpSlice.status;

export const signUpSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {}
});

export default signUpSlice.reducer;
