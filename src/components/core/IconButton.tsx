import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Color } from '../../styles/Color';

const IconButton = (
  props: TouchableOpacityProps &
    React.ComponentProps<typeof MaterialCommunityIcons>
) => {
  return (
    <TouchableOpacity
      style={[
        {
          margin: 4,
          backgroundColor: Color.base,
          borderRadius: 16,
          padding: 8,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: Color.accent[100],
        },
      ]}
      onPress={props.onPress}
    >
      <MaterialCommunityIcons name={props.name} color={props.color || Color.text.primary} size={32} />
    </TouchableOpacity>
  );
};

export default IconButton;
