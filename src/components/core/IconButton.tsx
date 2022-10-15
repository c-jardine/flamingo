import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const IconButton = (
  props: TouchableOpacityProps &
    React.ComponentProps<typeof MaterialCommunityIcons>
) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[
        {
          margin: 4,
          backgroundColor: theme.colors.background,
          borderRadius: 16,
          padding: theme.spacing.sm,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: theme.colors.text['100'],
        },
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
