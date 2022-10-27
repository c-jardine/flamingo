import { createSlice } from '@reduxjs/toolkit';

interface VerificationProps {
  idImage: string | null;
  isVerified: boolean;
}

const initialState: VerificationProps = {
  idImage: null,
  isVerified: false,
};

export const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    setIdImage: (state, action) => {
      state.idImage = action.payload;
    },
    setIsVerified: (state, action) => {
      state.isVerified = action.payload;
    },
  },
});

export const { setIdImage, setIsVerified } = verificationSlice.actions;

export default verificationSlice.reducer;
