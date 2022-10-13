import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Color } from '../../styles/Color';

export default ({ icon, focused }: { icon: any; focused: boolean }) => {
  return (
    <MaterialCommunityIcons
      name={icon}
      style={{ marginBottom: -7 }}
      size={28}
      color={focused ? Color.primary : Color.text.body}
    />
  );
};
