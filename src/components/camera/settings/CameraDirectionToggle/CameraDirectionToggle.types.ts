import React from 'react';

type CameraDirectionToggleProps = {
  isFrontCameraEnabled: boolean;
  setIsFrontCameraEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export default CameraDirectionToggleProps;
