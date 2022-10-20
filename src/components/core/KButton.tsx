import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const KButton = (
  props: TouchableOpacityProps & { contentContainerStyle?: ViewStyle }
) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View
      style={[
        { justifyContent: 'center', flexDirection: 'row' },
        props.contentContainerStyle,
      ]}
    >
      <TouchableOpacity
        {...props}
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.primary,
            borderWidth: 0,
            borderRadius: 16,
          },
          props.style,
        ]}
        onPress={props.onPress}
      >
        {props.children}
      </TouchableOpacity>
    </View>
  );
};
export default KButton;
