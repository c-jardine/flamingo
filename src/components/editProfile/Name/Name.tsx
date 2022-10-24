import { FormikValues, useFormikContext } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { TextInput } from '../../form';

const Name = () => {
  const { values, handleChange, errors, touched } =
    useFormikContext<FormikValues>();

  return (
    <View>
      <TextInput
        placeholder='First name'
        value={values.firstName}
        onChangeText={handleChange('firstName')}
      />
      <TextInput
        placeholder='Last name'
        value={values.lastName}
        onChangeText={handleChange('lastName')}
      />
    </View>
  );
};

export default Name;
