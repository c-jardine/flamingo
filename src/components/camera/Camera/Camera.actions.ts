import { Camera, CameraPictureOptions } from 'expo-camera';
import React from 'react';

export const _takePhoto = async (cameraRef: React.RefObject<Camera>) => {
  const result = await cameraRef.current?.takePictureAsync({
    aspect: [1, 1],
    quality: 0.5,
    base64: true,
  } as CameraPictureOptions);

  return result;
};
