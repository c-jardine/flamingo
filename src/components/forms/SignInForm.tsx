import { Formik } from 'formik';
import React from 'react';
import { Text, View } from 'react-native';

import { signIn } from '../../handlers/handleAuth';
import { SignInSchema } from '../../validation';
import KButton from '../utils/KButton';
import TextInput from './TextInput';
import { Color } from '../../styles/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
            paddingBottom: 20,
          }}
        >
          <View style={{paddingHorizontal: 32}}>
            <TextInput
              label='Email'
              value={values.email}
              onChangeText={handleChange('email')}
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
              secureTextEntry
              onChangeText={handleChange('password')}
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
          </View>

          <KButton label='Sign in' loading={false} onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default SignInForm;
