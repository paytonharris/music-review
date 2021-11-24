import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './app/store';


export interface UserInfo {
  status: 'initial' | 'success' | 'loading' | 'failure';
  email?: string;
  name?: string;
  id?: string;
}

const initialState: UserInfo = {
  status: 'initial',
  email: undefined,
  name: undefined,
  id: undefined,
};

export const selectUserInfo = (state: RootState) => state.authSlice;

export const authSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.status = action.payload.status;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
  }
});

export const { setUserInfo } = authSlice.actions;

export default authSlice.reducer;
