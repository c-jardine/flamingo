import React from 'react';
import { Text } from 'react-native';
import { ThemeContext } from '../../../provider/ThemeProvider';
import TabBarTextProps from './TabBarText.types';

const TabBarText = (props: TabBarTextProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <Text
      style={{
        marginBottom: 5,
        fontSize: 10,
        color: props.focused ? theme.colors.primary : theme.colors.text['400'],
      }}
    >
      {props.title}
    </Text>
  );
};

export default TabBarText;
