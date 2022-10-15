import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const MenuItem = ({
  children,
  onPress,
  iconStyle,
}: {
  children: any;
  onPress: () => void;
  iconStyle?: any;
}) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <TouchableOpacity
      onPress={onPress}
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
        {children}
      </Text>
      <MaterialCommunityIcons
        name='chevron-right'
        size={28}
        color={theme.colors.text['300']}
        {...iconStyle}
      />
    </TouchableOpacity>
  );
};
export default MenuItem;
