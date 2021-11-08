import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import albumSearchReducer from '../features/albumSearch/albumSearchSlice';

export const store = configureStore({
  reducer: {
    albumSearch: albumSearchReducer,
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
