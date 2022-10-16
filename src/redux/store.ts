import { configureStore } from '@reduxjs/toolkit';
import cameraReducer from './slices/cameraSlice';

export const store = configureStore({
  reducer: { cameraReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
