import { createSlice } from '@reduxjs/toolkit';

interface AppProps {
  loading: boolean;
  darkMode: boolean;
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    darkMode: true,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = appSlice.actions;

export default appSlice.reducer;
