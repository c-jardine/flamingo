import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik, FormikValues } from 'formik';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { AuthScreensEnum } from '../../enums/AuthScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { AuthScreenNavigatorProps } from '../../types/auth/AuthScreen';
import { SignUpSchema } from '../../validation';
import KButton from '../core/KButton';
import TextInput from './TextInput';

const SignUpForm = (props: AuthScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <Formik
      validationSchema={SignUpSchema}
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      // onSubmit={(values) => signUp(values)}
      onSubmit={(values) => props.navigator(AuthScreensEnum.VERIFY_IDENTITY)}
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
            <Animated.View
              entering={FadeIn.duration(200).delay(600)}
              exiting={FadeOut.duration(200)}
            >
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
                <Text style={{ color: theme.colors.error }}>
                  {errors.email}
                </Text>
              ) : null}
            </Animated.View>

            <Animated.View
              entering={FadeIn.duration(200).delay(700)}
              exiting={FadeOut.duration(200).delay(100)}
            >
              <TextInput
                label='Password'
                value={values.password}
                textContentType='password'
                isPassword
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
                <Text style={{ color: theme.colors.error }}>
                  {errors.password}
                </Text>
              ) : null}
            </Animated.View>

            <Animated.View
              entering={FadeIn.duration(200).delay(800)}
              exiting={FadeOut.duration(200).delay(200)}
            >
              <TextInput
                label='Confirm password'
                value={values.confirmPassword}
                textContentType='password'
                isPassword
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
                <Text style={{ color: theme.colors.error }}>
                  {errors.confirmPassword}
                </Text>
              ) : null}
            </Animated.View>
          </View>

          <Animated.View
            entering={FadeIn.duration(200).delay(900)}
            exiting={FadeOut.duration(200).delay(300)}
          >
            <KButton
              label='Next'
              loading={false}
              onPress={handleSubmit as (values: FormikValues) => void}
            />
          </Animated.View>
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
