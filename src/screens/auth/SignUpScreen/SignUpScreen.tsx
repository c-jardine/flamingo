import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik, FormikValues } from 'formik';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ArrowNavigator } from '../../../components/common';
import { TextInput, TextInputError } from '../../../components/form';
import { FormPageLayout } from '../../../components/layouts';
import { ThemeContext } from '../../../providers';
import { SignUpSchema } from './SignUpScreen.schema';
import { sendVerificationEmail } from './SignUpScreen.service';
import { SignUpScreenNavigationProp } from './SignUpScreen.type';

const SignUpScreen = (props: { navigation: SignUpScreenNavigationProp }) => {
  const { theme } = React.useContext(ThemeContext);

  const _handleNext = async (values: FormikValues) => {
    await sendVerificationEmail(values, () =>
      props.navigation.navigate('ConfirmEmail')
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
                visible: false,
              }}
              nextComponent={{
                onPress: handleSubmit,
                disabled: !!errors?.email || !!errors?.password || false,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: theme.spacing.sm,
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: theme.colors.text['300'] }}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('SignIn')}
              >
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: 'bold',
                  }}
                >
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </FormPageLayout.PageFooter>
        </FormPageLayout>
      )}
    </Formik>
  );
};

export default SignUpScreen;
