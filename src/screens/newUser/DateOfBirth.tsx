import { differenceInYears, intervalToDuration } from 'date-fns';
import { parse } from 'date-fns/esm';
import { useFormikContext } from 'formik';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Header from '../../components/core/Header';
import IconButton from '../../components/core/IconButton';
import { NewProfileScreenEnum } from '../../enums/NewProfileScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { NewProfileScreenNavigatorProps } from '../../types/auth/NewProfileScreenProps';
import { ProfileProps } from '../../types/core/profileProps';

const DateOfBirth = (props: NewProfileScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  const [dob, setDob] = React.useState<string>('');
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const handleSetDate = () => {
    if (dob.length === 10) {
      const birthDate = parse(dob, 'MM/dd/yyyy', new Date());
      const { years } = intervalToDuration({
        start: birthDate,
        end: new Date(),
      });

      years && (years >= 18 && years <= 100) ? setIsValid(true) : setIsValid(false);
    } else {
      setIsValid(false);
    }
  };

  React.useEffect(() => {
    handleSetDate();
  }, [dob]);

  const { values, errors, touched, handleSubmit } =
    useFormikContext<ProfileProps>();

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
              <Header.Title>When were you born?</Header.Title>
              <Header.Description>
                Make sure it's right, you won't be able to change it later.
              </Header.Description>
            </Header>

            <View style={{ marginTop: theme.spacing.xxl }} />

            <View
              style={{
                flex: 1,
                // justifyContent: 'space-between',
              }}
            >
              <MaskedTextInput
                placeholder='MM / DD / YYYY'
                type='date'
                options={{
                  dateFormat: 'MM/DD/YYYY',
                }}
                mask='MM/DD/YYYY'
                value={dob}
                onChangeText={setDob}
                style={{
                  backgroundColor: theme.colors.text['50'],
                  borderRadius: 16,
                  overflow: 'hidden',
                  color: theme.colors.text['800'],
                  padding: 16,
                  paddingLeft: 16,
                }}
                keyboardType='number-pad'
              />
            </View>
          </Animated.View>
          <View style={{ alignItems: 'flex-end' }}>
            <IconButton
              name='arrow-right'
              onPress={() => {
                props.navigator(NewProfileScreenEnum.DATE_OF_BIRTH);
              }}
              disabled={!isValid}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default DateOfBirth;
