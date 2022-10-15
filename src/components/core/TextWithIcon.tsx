import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const TextWithIcon = ({ children, icon }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
      <MaterialCommunityIcons
        name={icon}
        color={theme.colors.text['800']}
        size={20}
      />
      <Text style={{ color: theme.colors.text[500], fontSize: 16 }}>
        {children}
      </Text>
    </View>
  );
};

export default TextWithIcon;
