import { Formik } from 'formik';
import React from 'react';
import { Text, View } from 'react-native';

import { signIn } from '../../handlers/handleAuth';
import { SignInSchema } from '../../validation';
import KButton from '../utils/KButton';
import TextInput from './TextInput';
import { Color } from '../../styles/Color';

const SignInForm = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SignInSchema}
      onSubmit={(values) => signIn(values)}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 12,
            paddingBottom: 20,
          }}
        >
          <TextInput
            field='email'
            value={values.email}
            onChangeText={handleChange('email')}
            placeholder='EMAIL'
            icon='email-outline'
            keyboardType='email-address'
          />
          {errors.email && touched.email ? (
            <Text style={{ color: Color.primary }}>{errors.email}</Text>
          ) : null}

          <TextInput
            field='password'
            value={values.password}
            secureTextEntry
            onChangeText={handleChange('password')}
            placeholder='PASSWORD'
            icon='lock-outline'
          />
          {errors.password && touched.password ? (
            <Text style={{ color: Color.primary }}>{errors.password}</Text>
          ) : null}

          <KButton label='Sign in' loading={false} onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default SignInForm;
