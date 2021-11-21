import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { signUpWithAmplify } from './SignUpAPI';
import { CognitoUser } from '@aws-amplify/auth'

export interface NewUserSignUpDetails {
  email: string;
  password: string;
  name: string;
}

export interface SignUpState {
  status: 'initial' | 'succeeded' | 'loading' | 'failed';
  user?: { 
    cognitoUser: CognitoUser,
    userSub: string,
  };
}

const initialState: SignUpState = {
  status: 'initial',
  user: undefined,
};

export const signUp = createAsyncThunk(
  'authenticate/signUp',
  async (payload: NewUserSignUpDetails) => {
    const response = await signUpWithAmplify(payload);
    
    return response;
  }
);

export const selectUser = (state: RootState) => state.signUpSlice.user;
export const selectSignUpState = (state: RootState) => state.signUpSlice.status;

export const signUpSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      });
  }
});

export default signUpSlice.reducer;
