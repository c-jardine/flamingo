import React from 'react';

type CameraTypeToggleProps = {
  isFrontCameraEnabled: boolean;
  setIsFrontCameraEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export default CameraTypeToggleProps;
