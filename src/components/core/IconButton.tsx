import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Color } from '../../styles/Color';

const IconButton = (props) => {
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
      <MaterialCommunityIcons
        name={props.name}
        color={Color.text.primary}
        size={32}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
