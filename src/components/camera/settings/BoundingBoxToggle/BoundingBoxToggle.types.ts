import React from 'react';

type BoundingBoxToggleProps = {
  isBoundingBoxEnabled: boolean;
  setIsBoundingBoxEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isFrontCameraEnabled: boolean;
};

export default BoundingBoxToggleProps;
