import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { ThemeContext } from '../../../providers';

const Button = (
  props: TouchableOpacityProps & {
    contentContainerStyle?: ViewStyle;
    label: string;
  }
) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View style={props.contentContainerStyle}>
      <TouchableOpacity
        {...props}
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: props.disabled
              ? theme.colors.text['50']
              : theme.colors.primary,
            borderWidth: 0,
            borderRadius: 16,
            paddingVertical: theme.spacing.md,
          },
          props.style,
        ]}
        // onPress={props.onPress}
      >
        <Text
          style={{
            fontSize: 18,
            textTransform: 'uppercase',
            color: props.disabled
              ? theme.colors.text['800']
              : theme.colors.black,
          }}
        >
          {props.label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Button;
