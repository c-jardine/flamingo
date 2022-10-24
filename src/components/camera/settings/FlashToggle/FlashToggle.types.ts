import React from 'react';

type FlashToggleProps = {
  isFlashEnabled: boolean;
  setIsFlashEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export default FlashToggleProps;
