import React from 'react';
import { View } from 'react-native';
import { AutoFocusToggle } from '../AutoFocusToggle';
import { BoundingBoxToggle } from '../BoundingBoxToggle';
import { CameraDirectionToggle } from '../CameraDirectionToggle';
import { FlashToggle } from '../FlashToggle';
import { ToggleButton } from '../ToggleButton';
import SettingsMenuEnum from './SettingsMenu.enum';
import SettingsMenuProps from './SettingsMenu.types';

const SettingsMenu = (props: SettingsMenuProps) => {
  const [isSettingsEnabled, setIsSettingsEnabled] =
    React.useState<boolean>(false);

  const _handleToggleSettings = () => {
    setIsSettingsEnabled(!isSettingsEnabled);
  };

  return (
    <View>
      <ToggleButton
        name='dots-horizontal'
        isEnabled={isSettingsEnabled}
        handleAction={_handleToggleSettings}
      />
      {isSettingsEnabled && (
        <View>
          {/* Camera type toggle */}
          {props.settings.includes(SettingsMenuEnum.FrontCameraToggle) && (
            <CameraDirectionToggle
              isFrontCameraEnabled={props.isFrontCameraEnabled}
              setIsFrontCameraEnabled={props.setIsFrontCameraEnabled}
            />
          )}

          {/* Flash toggle */}
          {props.settings.includes(SettingsMenuEnum.FlashToggle) && (
            <FlashToggle
              isFlashEnabled={props.isFlashEnabled}
              setIsFlashEnabled={props.setIsFlashEnabled}
            />
          )}

          {/* Auto focus toggle */}
          {props.settings.includes(SettingsMenuEnum.AutoFocusToggle) && (
            <AutoFocusToggle
              isAutoFocusEnabled={props.isAutoFocusEnabled}
              setIsAutoFocusEnabled={props.setIsAutoFocusEnabled}
              isFrontCameraEnabled={props.isFrontCameraEnabled}
            />
          )}

          {/* Bounding box toggle */}
          {props.settings.includes(SettingsMenuEnum.BoundingBoxToggle) && (
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

export default SettingsMenu;
