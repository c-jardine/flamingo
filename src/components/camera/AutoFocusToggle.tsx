import React, { SetStateAction } from 'react';
import { View } from 'react-native';
import Animated, { Layout, ZoomIn, ZoomOut } from 'react-native-reanimated';
import CameraSettingsButton from '../core/CameraSettingsButton';

interface AutoFocusToggleProps {
  isAutoFocusEnabled: boolean;
  setIsAutoFocusEnabled: React.Dispatch<SetStateAction<boolean>>;
  isFrontCameraEnabled: boolean;
}

const AutoFocusToggle = (props: AutoFocusToggleProps) => {
  const handleToggle = () => {
    props.setIsAutoFocusEnabled(!props.isAutoFocusEnabled);
  };

  return (
    <View>
      <View>
        {!props.isFrontCameraEnabled && (
          <Animated.View
            layout={Layout.duration(200).delay(200)}
            entering={
              !props.isFrontCameraEnabled
                ? ZoomIn.duration(200).delay(300)
                : ZoomIn.duration(200).delay(200)
            }
            exiting={ZoomOut.duration(200).delay(100)}
          >
            <CameraSettingsButton
              name='focus-auto'
              isEnabled={props.isAutoFocusEnabled}
              handleAction={handleToggle}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default AutoFocusToggle;
