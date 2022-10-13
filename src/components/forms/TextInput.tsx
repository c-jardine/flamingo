import { FormikValues, useFormikContext } from 'formik';
import React from 'react';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Color } from '../../styles/Color';

const TextInput = (props, { label, value, onChangeText }) => {
  const { getFieldMeta } = useFormikContext<FormikValues>();
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <FloatingLabelInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      maxLength={32}
      isFocused={isFocused}
      animationDuration={150}
      selectionColor={Color.primary}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      inputStyles={{
        color: isFocused ? Color.text.primary : Color.text.body,
        fontSize: 16,
      }}
      {...props}
    />
  );
};

export default TextInput;
