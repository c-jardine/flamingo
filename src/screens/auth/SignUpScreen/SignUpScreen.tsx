import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik, FormikValues } from 'formik';
import React from 'react';
import { View } from 'react-native';
import ArrowNavigator from '../../../components/core/ArrowNavigator/ArrowNavigator';
import TextInput from '../../../components/forms/TextInput';
import TextInputError from '../../../components/forms/TextInputError';
import FormPageLayout from '../../../components/layouts/FormPageLayout';
import { ThemeContext } from '../../../provider/ThemeProvider';
import {
  AuthScreenEnum,
  AuthScreenNavigatorProps,
} from '../AuthScreen/AuthScreen.type';
import { SignUpSchema } from './SignUpScreen.schema';
import { sendVerificationEmail } from './SignUpScreen.service';

const SignUpScreen = (props: AuthScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  const _handleNext = async (values: FormikValues) => {
    await sendVerificationEmail(values, () =>
      props.navigator(AuthScreenEnum.EMAIL_VERIFICATION_SCREEN)
    );
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SignUpSchema}
      validateOnMount
      onSubmit={_handleNext}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <FormPageLayout
          // nextDisabled={!!errors}
          handleNext={handleSubmit as () => void}
        >
          {/* Header */}
          <FormPageLayout.PageHeader
            title='Create an account'
            description='Fill in the form to continue.'
          />

          {/* Body */}
          <FormPageLayout.PageContent
            contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
          >
            {/* Email input */}
            <TextInput
              placeholder='Email'
              value={values.email}
              textContentType='emailAddress'
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

            {/* Password input */}
            <TextInput
              placeholder='Password'
              value={values.password}
              textContentType='newPassword'
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
          </FormPageLayout.PageContent>

          {/* Footer */}
          <FormPageLayout.PageFooter>
            <ArrowNavigator
              backComponent={{
                disabled: false,
                onPress: () => props.navigator(AuthScreenEnum.SIGN_IN_SCREEN),
              }}
              nextComponent={{
                onPress: handleSubmit,
                disabled: !!errors?.email || !!errors?.password || false,
              }}
            />
          </FormPageLayout.PageFooter>
        </FormPageLayout>
      )}
    </Formik>
  );
};

export default SignUpScreen;
