import { CameraCapturedPicture, CameraType } from 'expo-camera';
import React from 'react';
import { SettingsMenuEnum } from '../settings';

type CameraProps = {
  boundingBox?: React.ComponentType;
  image: CameraCapturedPicture | null;
  setImage: React.Dispatch<React.SetStateAction<CameraCapturedPicture | null>>;
  settings: SettingsMenuEnum[];
  onSubmit: () => void;
  defaultCamera?: CameraType;
};

export default CameraProps;
