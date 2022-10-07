import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../../styles/Color';

export default ({ icon, focused }: { icon: any; focused: boolean }) => {
  return (
    <Ionicons
      name={icon}
      style={{ marginBottom: -7 }}
      size={24}
      color={focused ? Color.primary : Color.text.body}
    />
  );
};
