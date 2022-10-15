import React from 'react';
import {
  FloatingLabelInput,
  FloatingLabelProps,
} from 'react-native-floating-label-input';
import { ThemeContext } from '../../provider/ThemeProvider';

const TextInput = (props: FloatingLabelProps) => {
  const { theme } = React.useContext(ThemeContext);

  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <FloatingLabelInput
      {...props}
      label={props.label}
      value={props.value}
      onChangeText={props.onChangeText}
      maxLength={32}
      isFocused={isFocused}
      animationDuration={150}
      selectionColor={theme.colors.primary}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      labelStyles={{
        paddingLeft: props.leftComponent ? theme.spacing.sm : 0,
      }}
      inputStyles={{
        color: isFocused ? theme.colors.text['800'] : theme.colors.text['300'],
        fontSize: 16,
        paddingLeft: props.leftComponent ? theme.spacing.sm : 0,
      }}
    />
  );
};

export default TextInput;
