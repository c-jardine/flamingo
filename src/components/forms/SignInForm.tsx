import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik, FormikValues } from 'formik';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ThemeContext } from '../../provider/ThemeProvider';
import { signIn } from '../../services/auth.service';
import { SignInSchema } from '../../validation';
import KButton from '../core/KButton';
import TextInput from './TextInput';
import TextInputError from './TextInputError';

const SignInForm = () => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SignInSchema}
      onSubmit={(values) => signIn(values)}
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
