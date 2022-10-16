import React, { SetStateAction } from 'react';
import Animated, { Layout, ZoomIn, ZoomOut } from 'react-native-reanimated';
import CameraSettingsButton from '../core/CameraSettingsButton';

interface CameraTypeToggleProps {
  isFrontCameraEnabled: boolean;
  setIsFrontCameraEnabled: React.Dispatch<SetStateAction<boolean>>;
}

const CameraTypeToggle = (props: CameraTypeToggleProps) => {
  const handleToggle = () => {
    props.setIsFrontCameraEnabled(!props.isFrontCameraEnabled);
  };

  return (
    <Animated.View
      layout={Layout.duration(200).delay(200)}
      entering={ZoomIn.duration(200)}
      exiting={ZoomOut.duration(200).delay(300)}
    >
      <CameraSettingsButton
        name={props.isFrontCameraEnabled ? 'camera-rear' : 'camera-front'}
        isEnabled={props.isFrontCameraEnabled}
        handleAction={handleToggle}
      />
    </Animated.View>
  );
};

export default CameraTypeToggle;
