import { FormikValues, useFormikContext } from 'formik';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import KButton from '../../components/core/KButton';
import TextInput from '../../components/forms/TextInput';
import TextInputError from '../../components/forms/TextInputError';
import { ProfileProps } from '../../types/core/profileProps';

const PersonalInfoForm = () => {
  const { values, handleChange, errors, touched, handleSubmit } =
    useFormikContext<ProfileProps>();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: 'space-around' }}>
          <TextInput
            placeholder='First name'
            value={values.first_name}
            onChangeText={handleChange('first_name')}
            autoCompleteType='off'
          />
          {errors.first_name && touched.first_name ? (
            <TextInputError>{errors.first_name}</TextInputError>
          ) : null}

          <View style={{ height: 16 }} />

          <TextInput
            placeholder='Last name'
            value={values.last_name}
            onChangeText={handleChange('last_name')}
          />
          {errors.last_name && touched.last_name ? (
            <TextInputError>{errors.last_name}</TextInputError>
          ) : null}

          <KButton
            label='Next'
            loading={false}
            onPress={handleSubmit as (values: FormikValues) => void}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PersonalInfoForm;
