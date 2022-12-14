import React from 'react';
import Animated, { Layout, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { ToggleButton } from '../ToggleButton';
import FlashToggleProps from './FlashToggle.types';

const FlashToggle = (props: FlashToggleProps) => {
  const handleToggle = () => {
    props.setIsFlashEnabled(!props.isFlashEnabled);
  };

  return (
    <Animated.View
      layout={Layout.duration(200).delay(200)}
      entering={ZoomIn.duration(200).delay(100)}
      exiting={ZoomOut.duration(200).delay(200)}
    >
      <ToggleButton
        name='flash'
        isEnabled={props.isFlashEnabled}
        handleAction={handleToggle}
      />
    </Animated.View>
  );
};

export default FlashToggle;
