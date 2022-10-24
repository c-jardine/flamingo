import React from 'react';
import { View } from 'react-native';
import Animated, { Layout, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { ToggleButton } from '../ToggleButton';
import AutoFocusToggleProps from './AutoFocusToggle.types';

const AutoFocusToggle = (props: AutoFocusToggleProps) => {
  const _handleToggle = () => {
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
            <ToggleButton
              name='focus-auto'
              isEnabled={props.isAutoFocusEnabled}
              handleAction={_handleToggle}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default AutoFocusToggle;
