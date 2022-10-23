import React from 'react';
import { Text } from 'react-native';
import { ThemeContext } from '../../../provider/ThemeProvider';
import TextInputErrorProps from './TextInputError.types';

const TextInputError = (props: TextInputErrorProps) => {
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
