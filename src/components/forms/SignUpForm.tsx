import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik, FormikValues } from 'formik';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { AuthScreensEnum } from '../../enums/AuthScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { AuthScreenNavigatorProps } from '../../types/auth/AuthScreen';
import { SignUpSchema } from '../../validation';
import KButton from '../core/KButton';
import TextInput from './TextInput';
import TextInputError from './TextInputError';

const SignUpForm = (props: AuthScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  const handleValidateAndSubmit = (values: FormikValues) => {
    console.log(values);
    props.navigator(AuthScreensEnum.VERIFY_IDENTITY);
  };

  return (
    <Formik
      validationSchema={SignUpSchema}
      initialValues={{ email: '', password: '' }}
      // onSubmit={(values) => signUp(values)}
      onSubmit={handleValidateAndSubmit}
    >
      {({ handleChange, handleBlur, values, errors, touched }) => (
        <View>
          <View style={{ paddingHorizontal: 16 }}>
            <Animated.View
              entering={FadeIn.duration(200).delay(600)}
              exiting={FadeOut.duration(200)}
            >
              <TextInput
                placeholder='Email'
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
                <TextInputError>{errors.email}</TextInputError>
              ) : null}
            </Animated.View>

            <View style={{ height: 16 }} />

            <Animated.View
              entering={FadeIn.duration(200).delay(700)}
              exiting={FadeOut.duration(200).delay(100)}
            >
              <TextInput
                placeholder='Password'
                value={values.password}
                textContentType='newPassword'
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
                <TextInputError>{errors.password}</TextInputError>
              ) : null}
            </Animated.View>

            <View style={{ height: 16 }} />

            {/* <Animated.View
              entering={FadeIn.duration(200).delay(800)}
              exiting={FadeOut.duration(200).delay(200)}
            >
              <TextInput
                placeholder='Confirm password'
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
                <TextInputError>{errors.confirmPassword}</TextInputError>
              ) : null}
            </Animated.View> */}
          </View>

          <Animated.View
            entering={FadeIn.duration(200).delay(900)}
            exiting={FadeOut.duration(200).delay(300)}
          >
            <KButton
              label='Next'
              loading={false}
              onPress={() => handleValidateAndSubmit(values)}
            />
          </Animated.View>
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
