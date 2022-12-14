import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../providers';
import IconButtonProps from './IconButton.types';

const IconButton = (props: IconButtonProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: props.contentContainerProps?.disabled
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
      {...props.contentContainerProps}
    >
      <MaterialCommunityIcons
        color={props.iconProps?.color || theme.colors.text['800']}
        size={props.iconProps?.size || 32}
        {...props.iconProps}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
