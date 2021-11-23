import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { CognitoUser } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';

export interface VerifyState {
  status: 'initial' | 'succeeded' | 'loading' | 'failed';
}

const initialState: VerifyState = {
  status: 'initial',
};

interface VerificationInfo {
  email: string;
  code: string;
}

const verifyWithAmplify = async (email: string, code: string) => {
  try {
    await Auth.confirmSignUp(email, code);
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}

export const verify = createAsyncThunk(
  'verify/verify',
  async (payload: VerificationInfo) => {
    const response = await verifyWithAmplify(payload.email, payload.code);
    
    return response;
  }
);

export const verifySlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verify.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verify.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.status = 'succeeded';
      });
  }
});

export default verifySlice.reducer;
