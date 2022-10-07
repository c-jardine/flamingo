import { Formik } from 'formik';
import React from 'react';
import { Text, View } from 'react-native';

import { signUp } from '../../handlers/handleAuth';
import { SignUpSchema } from '../../validation';
import KButton from '../utils/KButton';
import TextInput from './TextInput';
import { Color } from '../../styles/Color';

const SignUpForm = () => {
  return (
    <Formik
      validationSchema={SignUpSchema}
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      onSubmit={(values) => signUp(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View>
          <TextInput
            field='email'
            value={values.email}
            textContentType='emailAddress'
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
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
            textContentType='password'
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder='PASSWORD'
            icon='lock-outline'
          />
          {errors.password && touched.password ? (
            <Text style={{ color: Color.primary }}>{errors.password}</Text>
          ) : null}

          <TextInput
            field='confirmPassword'
            value={values.confirmPassword}
            textContentType='password'
            secureTextEntry
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            placeholder='CONFIRM PASSWORD'
            icon='lock-outline'
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <Text style={{ color: Color.primary }}>
              {errors.confirmPassword}
            </Text>
          ) : null}

          <KButton label='Sign up' loading={false} onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
