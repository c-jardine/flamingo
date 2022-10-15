import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const Title = ({ children, icon }) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons
          name={icon}
          color={theme.colors.text['600']}
          size={24}
        />
        <Text
          style={{
            ...theme.textVariants.subtitle,
            marginLeft: theme.spacing.sm,
          }}
        >
          {children}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: theme.colors.text['50'],
          marginTop: theme.spacing.sm,
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
