import React from 'react';
import {
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  View,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FormikErrors, useFormikContext, FormikValues } from 'formik';
import { Color } from '../../styles/Color';
import { FloatingLabelInput } from 'react-native-floating-label-input';

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
