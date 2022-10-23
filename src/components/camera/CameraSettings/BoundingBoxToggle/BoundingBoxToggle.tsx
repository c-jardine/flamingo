import React from 'react';
import Animated, { Layout, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { CameraSettingsToggle } from '../CameraSettingsToggle';
import BoundingBoxToggleProps from './BoundingBoxToggle.types';

const BoundingBoxToggle = (props: BoundingBoxToggleProps) => {
  const _handleToggle = () => {
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
      <CameraSettingsToggle
        name='crop-free'
        isEnabled={props.isBoundingBoxEnabled}
        handleAction={_handleToggle}
      />
    </Animated.View>
  );
};

export default BoundingBoxToggle;
