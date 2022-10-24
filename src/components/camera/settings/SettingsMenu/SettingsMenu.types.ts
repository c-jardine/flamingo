import React from 'react';
import SettingsMenuEnum from './SettingsMenu.enum';

type SettingsMenuProps = {
  settings: SettingsMenuEnum[];
  isFrontCameraEnabled: boolean;
  setIsFrontCameraEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isFlashEnabled: boolean;
  setIsFlashEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isAutoFocusEnabled: boolean;
  setIsAutoFocusEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isBoundingBoxEnabled: boolean;
  setIsBoundingBoxEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export default SettingsMenuProps;
