import React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Color } from '../../styles/Color';

const TextWithIcon = ({ children, icon }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
      <MaterialCommunityIcons
        name={icon}
        color={Color.text.primary}
        size={20}
      />
      <Text style={{ color: Color.accent[500], fontSize: 16 }}>{children}</Text>
    </View>
  );
};

export default TextWithIcon;
