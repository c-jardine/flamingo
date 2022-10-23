import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ThemeContext } from '../../../../provider/ThemeProvider';

const IDBoundingBox = () => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      style={{
        width: '80%',
        aspectRatio: 1.59,
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            width: 25,
            aspectRatio: 1,
            borderTopWidth: 3,
            borderLeftWidth: 3,
            borderColor: theme.colors.success,
          }}
        />
        <View
          style={{
            width: 25,
            aspectRatio: 1,
            borderTopWidth: 3,
            borderRightWidth: 3,
            borderColor: theme.colors.success,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            width: 25,
            aspectRatio: 1,
            borderLeftWidth: 3,
            borderBottomWidth: 3,
            borderColor: theme.colors.success,
          }}
        />
        <View
          style={{
            width: 25,
            aspectRatio: 1,
            borderRightWidth: 3,
            borderBottomWidth: 3,
            borderColor: theme.colors.success,
          }}
        />
      </View>
    </Animated.View>
  );
};

export default IDBoundingBox;
