import { createSlice } from '@reduxjs/toolkit';
import { CameraCapturedPicture } from 'expo-camera';

interface CameraSettingsType {
  isCameraReady: boolean;
  isFlashEnabled: boolean;
  isFrontCameraEnabled: boolean;
  isAutoFocusEnabled: boolean;
  isBoundingBoxEnabled: boolean;
  focusDepth: number;
  image: CameraCapturedPicture | null;
}

const initialState: CameraSettingsType = {
  isCameraReady: false,
  isFlashEnabled: false,
  isFrontCameraEnabled: false,
  isAutoFocusEnabled: true,
  isBoundingBoxEnabled: true,
  focusDepth: 0,
  image: null,
};

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    toggleIsCameraReady: (state, action) => {
      state.isCameraReady = action.payload;
    },
    toggleFlash: (state) => {
      state.isFlashEnabled = !state.isFlashEnabled;
    },
    toggleFrontCamera: (state) => {
      state.isFrontCameraEnabled = !state.isFrontCameraEnabled;
    },
    toggleAutoFocus: (state) => {
      state.isAutoFocusEnabled = !state.isAutoFocusEnabled;
    },
    toggleBoundingBox: (state) => {
      state.isBoundingBoxEnabled = !state.isBoundingBoxEnabled;
    },
    handleFocusDepth: (state, action) => {
      state.focusDepth = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const {
  toggleIsCameraReady,
  toggleFlash,
  toggleFrontCamera,
  toggleAutoFocus,
  toggleBoundingBox,
  handleFocusDepth,
  setImage,
} = cameraSlice.actions;

export default cameraSlice.reducer;
