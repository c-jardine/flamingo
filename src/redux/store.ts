import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import cameraReducer from './slices/cameraSlice';
import verificationReducer from './slices/verificationSlice';

export const store = configureStore({
  reducer: { cameraReducer, verificationReducer, appReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
