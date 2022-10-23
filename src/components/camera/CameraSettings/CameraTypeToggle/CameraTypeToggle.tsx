import React from 'react';
import Animated, { Layout, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { CameraSettingsToggle } from '../../CameraSettings';
import CameraTypeToggleProps from './CameraTypeToggle.types';

const CameraTypeToggle = (props: CameraTypeToggleProps) => {
  const _handleToggle = () => {
    props.setIsFrontCameraEnabled(!props.isFrontCameraEnabled);
  };

  return (
    <Animated.View
      layout={Layout.duration(200).delay(200)}
      entering={ZoomIn.duration(200)}
      exiting={ZoomOut.duration(200).delay(300)}
    >
      <CameraSettingsToggle
        name={props.isFrontCameraEnabled ? 'camera-rear' : 'camera-front'}
        isEnabled={props.isFrontCameraEnabled}
        handleAction={_handleToggle}
      />
    </Animated.View>
  );
};

export default CameraTypeToggle;
