import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../authSlice';
import albumSearchReducer from '../features/albumSearch/albumSearchSlice';
import signUpReducer from '../features/signUp/signUpSlice';

export const store = configureStore({
  reducer: {
    albumSearch: albumSearchReducer,
    signUpSlice: signUpReducer,
    authSlice: authSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
