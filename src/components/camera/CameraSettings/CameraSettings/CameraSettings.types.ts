import React from 'react';
import CameraSettingsEnum from './CameraSettings.enum';

type CameraSettingsProps = {
  settings: CameraSettingsEnum[];
  isFrontCameraEnabled: boolean;
  setIsFrontCameraEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isFlashEnabled: boolean;
  setIsFlashEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isAutoFocusEnabled: boolean;
  setIsAutoFocusEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isBoundingBoxEnabled: boolean;
  setIsBoundingBoxEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export default CameraSettingsProps;
