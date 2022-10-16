import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik, FormikValues } from 'formik';
import React from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';
import { signUp } from '../../services/auth.service';
import { SignUpSchema } from '../../validation';
import KButton from '../core/KButton';
import TextInput from './TextInput';
import { useNavigation } from '@react-navigation/native';
import { VerifyIdScreenNavigationProp } from '../../types/navigation/authStack/verifyIdScreen';

const SignUpForm = () => {
  const { theme } = React.useContext(ThemeContext);
  const navigation = useNavigation<VerifyIdScreenNavigationProp>();

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
              <Text style={{ color: theme.colors.error }}>{errors.email}</Text>
            ) : null}

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
          </View>

          <KButton
            label='Next'
            loading={false}
            // onPress={handleSubmit as (values: FormikValues) => void}
            onPress={() => navigation.navigate('VerifyId')}
          />
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
