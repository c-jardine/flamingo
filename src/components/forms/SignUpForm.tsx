import { Formik } from 'formik';
import React from 'react';
import { Text, View } from 'react-native';

import { signUp } from '../../handlers/handleAuth';
import { SignUpSchema } from '../../validation';
import KButton from '../utils/KButton';
import TextInput from './TextInput';
import { Color } from '../../styles/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
          <View style={{ paddingHorizontal: 16 }}>
            <TextInput
              label='Email'
              value={values.email}
              textContentType='emailAddress'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              leftComponent={
                <MaterialCommunityIcons
                  name='email-outline'
                  size={20}
                  color='white'
                />
              }
              keyboardType='email-address'
            />
            {errors.email && touched.email ? (
              <Text style={{ color: Color.primary }}>{errors.email}</Text>
            ) : null}

            <TextInput
              label='Password'
              value={values.password}
              textContentType='password'
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              leftComponent={
                <MaterialCommunityIcons
                  name='lock-outline'
                  size={20}
                  color='white'
                />
              }
            />
            {errors.password && touched.password ? (
              <Text style={{ color: Color.primary }}>{errors.password}</Text>
            ) : null}

            <TextInput
              label='Confirm password'
              value={values.confirmPassword}
              textContentType='password'
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              leftComponent={
                <MaterialCommunityIcons
                  name='lock-outline'
                  size={20}
                  color='white'
                />
              }
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <Text style={{ color: Color.primary }}>
                {errors.confirmPassword}
              </Text>
            ) : null}
          </View>

          <KButton label='Sign up' loading={false} onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
