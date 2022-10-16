import React, { SetStateAction } from 'react';
import Animated, { Layout, ZoomIn, ZoomOut } from 'react-native-reanimated';
import CameraSettingsButton from '../core/CameraSettingsButton';

interface BoundingBoxToggleProps {
  isBoundingBoxEnabled: boolean;
  setIsBoundingBoxEnabled: React.Dispatch<SetStateAction<boolean>>;
  isFrontCameraEnabled: boolean;
}

const BoundingBoxToggle = (props: BoundingBoxToggleProps) => {
  const handleToggle = () => {
    props.setIsBoundingBoxEnabled(!props.isBoundingBoxEnabled);
  };

  return (
    <Animated.View
      layout={Layout.duration(200).delay(200)}
      entering={
        props.isFrontCameraEnabled
          ? ZoomIn.duration(200).delay(300)
          : ZoomIn.duration(200).delay(400)
      }
      exiting={ZoomOut.duration(200)}
    >
      <CameraSettingsButton
        name='crop-free'
        isEnabled={props.isBoundingBoxEnabled}
        handleAction={handleToggle}
      />
    </Animated.View>
  );
};

export default BoundingBoxToggle;
