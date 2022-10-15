import React from 'react';
import { Text } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

export default ({ title, focused }: { title: string; focused: boolean }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <Text
      style={{
        marginBottom: 5,
        fontSize: 10,
        color: focused ? theme.colors.primary : theme.colors.text['400'],
      }}
    >
      {title}
    </Text>
  );
};
