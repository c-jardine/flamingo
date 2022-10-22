import { Formik, FormikValues } from 'formik';
import React from 'react';
import {
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../../components/core/Button/Button';
import TextInput from '../../../components/forms/TextInput';
import TextInputError from '../../../components/forms/TextInputError';
import FormPageLayout from '../../../components/layouts/FormPageLayout';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { signIn } from '../../../services/auth.service';
import {
  AuthScreenEnum,
  AuthScreenNavigatorProps,
} from '../AuthScreen/AuthScreen.type';
import { SignInSchema } from './SignInScreen.schema';

const SignInScreen = (props: AuthScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  const _handleSignIn = async (values: FormikValues) => {
    await signIn(values);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SignInSchema}
      validateOnMount
      onSubmit={_handleSignIn}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <FormPageLayout>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 0.75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  resizeMode='contain'
                  style={{
                    height: 100,
                    width: 100,
                  }}
                  source={require('../../../../assets/images/icon.png')}
                />
              </View>

              <FormPageLayout.PageContent
                contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
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

                <View style={{ height: 16 }} />

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

                <View style={{ alignItems: 'flex-end' }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigator(AuthScreenEnum.FORGOT_PASSWORD_SCREEN);
                    }}
                    style={{ marginTop: theme.spacing.sm }}
                  >
                    <Text
                      style={{
                        color: theme.colors.primary,
                      }}
                    >
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                </View>

                <Button
                  disabled={!!errors?.email || !!errors?.password || false}
                  onPress={handleSubmit as () => void}
                  label='Sign in'
                  contentContainerStyle={{
                    marginTop: theme.spacing.xxl,
                  }}
                />
              </FormPageLayout.PageContent>

              <FormPageLayout.PageFooter>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: theme.spacing.sm,
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: theme.colors.text['300'] }}>
                    Don't have an account?{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigator(AuthScreenEnum.SIGN_UP_SCREEN)
                    }
                  >
                    <Text
                      style={{
                        color: theme.colors.primary,
                        fontWeight: 'bold',
                      }}
                    >
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </FormPageLayout.PageFooter>
            </View>
          </TouchableWithoutFeedback>
        </FormPageLayout>
      )}
    </Formik>
  );
};

export default SignInScreen;
