import React, { SetStateAction } from 'react';
import { View } from 'react-native';
import { CameraSetting } from '../../enums/CameraSetting';
import CameraSettingsButton from '../core/CameraSettingsButton';
import AutoFocusToggle from './AutoFocusToggle';
import BoundingBoxToggle from './BoundingBoxToggle';
import CameraTypeToggle from './CameraTypeToggle';
import FlashToggle from './FlashToggle';

interface CameraSettingsProps {
  settings: CameraSetting[];
  isFrontCameraEnabled: boolean;
  setIsFrontCameraEnabled: React.Dispatch<SetStateAction<boolean>>;
  isFlashEnabled: boolean;
  setIsFlashEnabled: React.Dispatch<SetStateAction<boolean>>;
  isAutoFocusEnabled: boolean;
  setIsAutoFocusEnabled: React.Dispatch<SetStateAction<boolean>>;
  isBoundingBoxEnabled: boolean;
  setIsBoundingBoxEnabled: React.Dispatch<SetStateAction<boolean>>;
}

const CameraSettings = (props: CameraSettingsProps) => {
  const [isSettingsEnabled, setIsSettingsEnabled] =
    React.useState<boolean>(false);

  const handleEnableSettings = () => {
    setIsSettingsEnabled(!isSettingsEnabled);
  };

  return (
    <View>
      <CameraSettingsButton
        name='dots-horizontal'
        isEnabled={isSettingsEnabled}
        handleAction={handleEnableSettings}
      />
      {isSettingsEnabled && (
        <View>
          {/* Camera type toggle */}
          {props.settings.includes(CameraSetting.FrontCameraToggle) && (
            <CameraTypeToggle
              isFrontCameraEnabled={props.isFrontCameraEnabled}
              setIsFrontCameraEnabled={props.setIsFrontCameraEnabled}
            />
          )}

          {/* Flash toggle */}
          {props.settings.includes(CameraSetting.FlashToggle) && (
            <FlashToggle
              isFlashEnabled={props.isFlashEnabled}
              setIsFlashEnabled={props.setIsFlashEnabled}
            />
          )}

          {/* Auto focus toggle */}
          {props.settings.includes(CameraSetting.AutoFocusToggle) && (
            <AutoFocusToggle
              isAutoFocusEnabled={props.isAutoFocusEnabled}
              setIsAutoFocusEnabled={props.setIsAutoFocusEnabled}
              isFrontCameraEnabled={props.isFrontCameraEnabled}
            />
          )}

          {/* Bounding box toggle */}
          {props.settings.includes(CameraSetting.BoundingBoxToggle) && (
            <BoundingBoxToggle
              isBoundingBoxEnabled={props.isBoundingBoxEnabled}
              setIsBoundingBoxEnabled={props.setIsBoundingBoxEnabled}
              isFrontCameraEnabled={props.isFrontCameraEnabled}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default CameraSettings;
