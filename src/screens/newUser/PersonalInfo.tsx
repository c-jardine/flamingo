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
import { NewProfileScreenEnum } from '../../enums/NewProfileScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { NewProfileScreenNavigatorProps } from '../../types/auth/NewProfileScreenProps';

const PersonalInfo = (props: NewProfileScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  const { values, handleChange, errors, touched, handleSubmit, validateField } =
    useFormikContext<{ firstName: string; lastName: string }>();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={128}
      style={{
        flex: 1,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Animated.View
            entering={FadeIn.duration(200).delay(200)}
            exiting={FadeOut.duration(200)}
            style={{ flex: 1 }}
          >
            <Header>
              <Header.Title>What's your name?</Header.Title>
              <Header.Description>
                Your first name is required, but feel free to add your last name
                as well.
              </Header.Description>
            </Header>

            <View style={{ marginTop: theme.spacing.xxl }} />

            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
              }}
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
            </View>
          </Animated.View>
          <View style={{ alignItems: 'flex-end' }}>
            <IconButton
              name='arrow-right'
              onPress={() => {
                if (!errors.firstName && !errors.lastName) {
                  props.navigator(NewProfileScreenEnum.DATE_OF_BIRTH);
                }
              }}
              disabled={!!errors.firstName || !!errors.lastName}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PersonalInfo;
