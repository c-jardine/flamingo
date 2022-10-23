import React from 'react';
import { Text } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const TextInputError = (props: { children: React.ReactNode }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <Text
      style={{
        marginTop: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        color: theme.colors.error,
      }}
    >
      {props && props.children}
    </Text>
  );
};

export default TextInputError;
