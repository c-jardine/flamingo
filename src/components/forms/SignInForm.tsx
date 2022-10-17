import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik, FormikValues } from 'formik';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ThemeContext } from '../../provider/ThemeProvider';
import { signIn } from '../../services/auth.service';
import { SignInSchema } from '../../validation';
import KButton from '../core/KButton';
import TextInput from './TextInput';

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
                <Text style={{ color: theme.colors.primary }}>
                  {errors.email}
                </Text>
              ) : null}
            </Animated.View>

            <Animated.View
              entering={FadeIn.duration(200).delay(600)}
              exiting={FadeOut.duration(200).delay(100)}
            >
              <TextInput
                label='Password'
                value={values.password}
                isPassword
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
                <Text style={{ color: theme.colors.primary }}>
                  {errors.password}
                </Text>
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
