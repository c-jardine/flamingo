import React from 'react';
import { Text } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const TextInputError = (props: { children: React.ReactNode }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <Text style={{ marginTop: 4, color: theme.colors.error }}>
      {props && props.children}
    </Text>
  );
};

export default TextInputError;
