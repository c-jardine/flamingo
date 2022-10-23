import React from 'react';

type AutoFocusToggleProps = {
  isAutoFocusEnabled: boolean;
  setIsAutoFocusEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isFrontCameraEnabled: boolean;
};

export default AutoFocusToggleProps;
