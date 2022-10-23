import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../provider/ThemeProvider';

const MenuItem = (props: MenuItemProps) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingVertical: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          color: theme.colors.text['300'],
        }}
      >
        {props.children}
      </Text>
      <MaterialCommunityIcons
        name='chevron-right'
        size={28}
        color={theme.colors.text['300']}
        {...props.iconStyle}
      />
    </TouchableOpacity>
  );
};
export default MenuItem;
