import React from 'react';
import { Text } from 'react-native';
import { Color } from '../../styles/Color';
export default ({ title, focused }: { title: string; focused: boolean }) => {
  return (
    <Text
      style={{
        marginBottom: 5,
        fontSize: 10,
        color: focused ? Color.primary : Color.text.body,
      }}
    >
      {title}
    </Text>
  );
};
