import Slider from '@react-native-community/slider';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { ThemeContext } from '../../../../provider/ThemeProvider';
import FocusSliderProps from './FocusSlider.types';

const FocusSlider = (props: FocusSliderProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <Animated.View
      entering={ZoomIn.duration(200)}
      exiting={ZoomOut.duration(200)}
      style={{
        position: 'absolute',
        bottom: theme.spacing.sm,
        left: 0,
        zIndex: 10,
        width: '100%',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '60%',
          alignItems: 'center',
          backgroundColor: theme.colors.baseSecondary['400'],
          borderWidth: 0.5,
          borderColor: theme.colors.text['100'],
          padding: theme.spacing.sm,
          paddingBottom: 0,
          borderRadius: 16,
        }}
      >
        <Text
          style={{
            textTransform: 'uppercase',
            color: theme.colors.white,
            fontSize: 10,
          }}
        >
          Focus Depth
        </Text>
        <Slider
          style={{
            width: '100%',
            height: 40,
          }}
          onValueChange={props.setFocusDepth}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={theme.colors.text['200']}
          maximumTrackTintColor={theme.colors.text['200']}
          thumbTintColor={theme.colors.white}
        />
      </View>
    </Animated.View>
  );
};

export default FocusSlider;
