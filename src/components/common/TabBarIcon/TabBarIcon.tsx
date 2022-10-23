import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ThemeContext } from '../../../providers';
import TabBarIconProps from './TabBarIcon.types';

const TabBarIcon = (props: TabBarIconProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <MaterialCommunityIcons
      name={props.icon}
      style={{ marginBottom: -7 }}
      size={28}
      color={props.focused ? theme.colors.primary : theme.colors.text['400']}
    />
  );
};

export default TabBarIcon;
