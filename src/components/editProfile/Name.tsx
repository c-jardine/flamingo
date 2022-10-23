import { FormikValues, useFormikContext } from 'formik';
import React from 'react';
import { View } from 'react-native';
import TextInput from '../form/TextInput';

const Name = () => {
  const { values, handleChange, errors, touched } =
    useFormikContext<FormikValues>();

  return (
    <View>
      <TextInput
        label='First name'
        value={values.firstName}
        onChangeText={handleChange('firstName')}
      />
      <TextInput
        label='Last name'
        value={values.lastName}
        onChangeText={handleChange('lastName')}
      />
    </View>
  );
};

export default Name;
