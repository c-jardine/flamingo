import React from 'react';
import { ActivityIndicator } from 'react-native';
import Animated, {
  BounceIn,
  BounceOut,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { ThemeContext } from '../../../providers';

const LoadingOverlay = () => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200).delay(200)}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.baseSecondary['600'],
      }}
    >
      <Animated.View
        entering={BounceIn.duration(200).delay(200)}
        exiting={BounceOut.duration(200)}
      >
        <ActivityIndicator size='large' color={theme.colors.primary} />
      </Animated.View>
    </Animated.View>
  );
};

export default LoadingOverlay;
