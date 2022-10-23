import React from 'react';
import { View } from 'react-native';
import {
  AutoFocusToggle,
  BoundingBoxToggle,
  CameraSettingsEnum,
  CameraSettingsToggle,
  CameraTypeToggle,
  FlashToggle,
} from '../../CameraSettings';
import { CameraSettingsProps } from '../../types';

const CameraSettings = (props: CameraSettingsProps) => {
  const [isSettingsEnabled, setIsSettingsEnabled] =
    React.useState<boolean>(false);

  const _handleToggleSettings = () => {
    setIsSettingsEnabled(!isSettingsEnabled);
  };

  return (
    <View>
      <CameraSettingsToggle
        name='dots-horizontal'
        isEnabled={isSettingsEnabled}
        handleAction={_handleToggleSettings}
      />
      {isSettingsEnabled && (
        <View>
          {/* Camera type toggle */}
          {props.settings.includes(CameraSettingsEnum.FrontCameraToggle) && (
            <CameraTypeToggle
              isFrontCameraEnabled={props.isFrontCameraEnabled}
              setIsFrontCameraEnabled={props.setIsFrontCameraEnabled}
            />
          )}

          {/* Flash toggle */}
          {props.settings.includes(CameraSettingsEnum.FlashToggle) && (
            <FlashToggle
              isFlashEnabled={props.isFlashEnabled}
              setIsFlashEnabled={props.setIsFlashEnabled}
            />
          )}

          {/* Auto focus toggle */}
          {props.settings.includes(CameraSettingsEnum.AutoFocusToggle) && (
            <AutoFocusToggle
              isAutoFocusEnabled={props.isAutoFocusEnabled}
              setIsAutoFocusEnabled={props.setIsAutoFocusEnabled}
              isFrontCameraEnabled={props.isFrontCameraEnabled}
            />
          )}

          {/* Bounding box toggle */}
          {props.settings.includes(CameraSettingsEnum.BoundingBoxToggle) && (
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
