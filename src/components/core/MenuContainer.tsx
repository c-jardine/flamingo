import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { TYPOGRAPHY } from '../../styles/typography';
import { Color } from '../../styles/Color';

const Title = ({ children, icon }) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons
          name={icon}
          color={Color.accent[600]}
          size={24}
        />
        <Text style={[TYPOGRAPHY.h2, { marginLeft: 8 }]}>{children}</Text>
      </View>
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: Color.accent[50],
          marginTop: 8,
        }}
      />
    </View>
  );
};

const MenuContainer = ({ children }) => {
  return <View>{children}</View>;
};

MenuContainer.Title = Title;
export default MenuContainer;
