import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const IconButton = (
  props: TouchableOpacityProps & {
    contentContainerStyle?: ViewStyle;
  } & React.ComponentProps<typeof MaterialCommunityIcons>
) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          backgroundColor: props.disabled
            ? theme.colors.text['50']
            : theme.colors.primary,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          height: 64,
          width: 64,
        },
        props.contentContainerStyle,
      ]}
      onPress={props.onPress}
    >
      <MaterialCommunityIcons
        name={props.name}
        color={props.color || theme.colors.text['800']}
        size={32}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
