import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { signUpWithAmplify } from './SignUpAPI';

export interface NewUserSignUpDetails {
  email: string;
  password: string;
  name: string;
}

export interface SignUpState {
  status: 'initial' | 'succeeded' | 'loading' | 'failed';
  loginEmail?: string;
}

const initialState: SignUpState = {
  status: 'initial',
  loginEmail: undefined,
};

export const signUp = createAsyncThunk(
  'authenticate/signUp',
  async (payload: NewUserSignUpDetails) => {
    const response = await signUpWithAmplify(payload);
    
    return response;
  }
);

export const selectSignUpState = (state: RootState) => state.signUpSlice.status;
export const selectLoginEmail = (state: RootState) => state.signUpSlice.loginEmail;

export const signUpSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
    setLoginEmail: (state, action: PayloadAction<string>) => {
      state.loginEmail = action.payload;
    },
  },
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
      });
  }
});

export const { setLoginEmail } = signUpSlice.actions;

export default signUpSlice.reducer;
