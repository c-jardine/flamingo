import { useFormikContext } from 'formik';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Header from '../../components/core/Header';
import IconButton from '../../components/core/IconButton';
import TextInput from '../../components/forms/TextInput';
import TextInputError from '../../components/forms/TextInputError';
import NewUserSetupLayout from '../../components/layouts/NewUserSetupLayout';
import { NewProfileScreenEnum } from '../../enums/NewProfileScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { NewProfileScreenNavigatorProps } from '../../types/auth/NewProfileScreenProps';

const PersonalInfoSetup = (props: NewProfileScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  const { values, handleChange, errors, touched, handleSubmit, validateField } =
    useFormikContext<{ firstName: string; lastName: string }>();
  return (
    <NewUserSetupLayout
      title="What's your name?"
      description='Your first name is required, but feel free to add your last name as well.'
      handleNext={() => {
        if (!errors.firstName && !errors.lastName) {
          props.navigator(NewProfileScreenEnum.DATE_OF_BIRTH);
        }
      }}
      nextDisabled={!!errors.firstName || !!errors.lastName}
    >
      <View>
        <TextInput
          placeholder='First name'
          value={values.firstName}
          onChangeText={handleChange('firstName')}
          autoCorrect={false}
        />
        {errors.firstName && touched.firstName ? (
          <TextInputError>{errors.firstName}</TextInputError>
        ) : null}
        <View style={{ height: 16 }} />

        <TextInput
          placeholder='Last name'
          value={values.lastName}
          onChangeText={handleChange('lastName')}
          autoCorrect={false}
        />
        {errors.lastName && touched.lastName ? (
          <TextInputError>{errors.lastName}</TextInputError>
        ) : null}
      </View>
    </NewUserSetupLayout>
  );
};

export default PersonalInfoSetup;
