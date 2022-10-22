import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NewProfileScreenEnum } from '../../../enums/NewProfileScreenEnum';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { PersonalInfoSchema } from '../../../validation/profileGeneralSchema';
import DateOfBirthScreen from '../DateOfBirthScreen.tsx/DateOfBirthScreen';
import GenderScreen from '../GenderScreen/GenderScreen';
import NewUserStartScreen from '../NewUserStartScreen/NewUserStartScreen';
import PersonalInfoScreen from '../PersonalInfoScreen/PersonalInfoScreen';
import PersonalityTypeScreen from '../PersonalityTypeScreen/PersonalityTypeScreen';
import PronounsScreen from '../PronounsScreen/PronounsScreen';
import SexualOrientationScreen from '../SexualOrientationScreen/SexualOrientationScreen';

export type NewUserProps = {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: { gender: string; identities: string[] };
};

const NewUserScreen = () => {
  const { theme } = React.useContext(ThemeContext);

  const [currentScreen, setCurrentScreen] =
    React.useState<NewProfileScreenEnum>(NewProfileScreenEnum.START);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Formik
          validationSchema={PersonalInfoSchema}
          initialValues={
            {
              firstName: '',
              lastName: '',
              dob: new Date(),
              gender: { gender: '', identities: [] },
            } as NewUserProps
          }
          onSubmit={(values) => console.log(values)}
          validateOnMount={true}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            {currentScreen === NewProfileScreenEnum.START && (
              <NewUserStartScreen navigator={setCurrentScreen} />
            )}
            {currentScreen === NewProfileScreenEnum.PERSONAL_INFO && (
              <PersonalInfoScreen navigator={setCurrentScreen} />
            )}
            {currentScreen === NewProfileScreenEnum.DATE_OF_BIRTH && (
              <DateOfBirthScreen navigator={setCurrentScreen} />
            )}
            {currentScreen === NewProfileScreenEnum.GENDER && (
              <GenderScreen navigator={setCurrentScreen} />
            )}
            {currentScreen === NewProfileScreenEnum.PRONOUNS && (
              <PronounsScreen navigator={setCurrentScreen} />
            )}
            {currentScreen === NewProfileScreenEnum.SEXUAL_ORIENTATION && (
              <SexualOrientationScreen navigator={setCurrentScreen} />
            )}
            {currentScreen === NewProfileScreenEnum.PERSONALITY_TYPE && (
              <PersonalityTypeScreen navigator={setCurrentScreen} />
            )}
          </View>
        </Formik>
      </SafeAreaView>
    </View>
  );
};

export default NewUserScreen;
