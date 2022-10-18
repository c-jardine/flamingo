import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik, FormikValues } from 'formik';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { AuthScreensEnum } from '../../enums/AuthScreenEnum';
import { AuthContext } from '../../provider/AuthProvider';
import { ThemeContext } from '../../provider/ThemeProvider';
import { signIn } from '../../services/auth.service';
import { AuthScreenNavigatorProps } from '../../types/auth/AuthScreen';
import { SignInSchema } from '../../validation';
import KButton from '../core/KButton';
import TextInput from './TextInput';
import TextInputError from './TextInputError';

export enum AccountState {
  NEW_USER,
  EXISTING_USER,
}

const SignInForm = (props: AuthScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);
  const { user, profile } = React.useContext(AuthContext);

  const handleSignIn = async (values: FormikValues) => {
    await signIn(values);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SignInSchema}
      onSubmit={(values) => handleSignIn(values)}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View>
          <View style={{ paddingHorizontal: 16 }}>
            <Animated.View
              entering={FadeIn.duration(200).delay(500)}
              exiting={FadeOut.duration(200)}
            >
              <TextInput
                placeholder='Email'
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
                <TextInputError>{errors.email}</TextInputError>
              ) : null}
            </Animated.View>
            <View style={{ height: 16 }} />
            <Animated.View
              entering={FadeIn.duration(200).delay(600)}
              exiting={FadeOut.duration(200).delay(100)}
            >
              <TextInput
                placeholder='Password'
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
                <TextInputError>{errors.password}</TextInputError>
              ) : null}
            </Animated.View>
          </View>

          <Animated.View
            entering={FadeIn.duration(200).delay(700)}
            exiting={FadeOut.duration(200).delay(200)}
          >
            <KButton
              label='Sign in'
              loading={false}
              onPress={handleSubmit as (values: FormikValues) => void}
            />
          </Animated.View>
        </View>
      )}
    </Formik>
  );
};

export default SignInForm;
