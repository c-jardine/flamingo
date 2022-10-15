import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ThemeContext } from '../../provider/ThemeProvider';

export default ({ icon, focused }: { icon: any; focused: boolean }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <MaterialCommunityIcons
      name={icon}
      style={{ marginBottom: -7 }}
      size={28}
      color={focused ? theme.colors.primary : theme.colors.text['400']}
    />
  );
};
