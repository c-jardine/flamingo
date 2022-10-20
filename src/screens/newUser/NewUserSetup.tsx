import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NewProfileScreenEnum } from '../../enums/NewProfileScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { PersonalInfoSchema } from '../../validation/profileGeneralSchema';
import DateOfBirthSetup from './DateOfBirthSetup';
import GenderSetup from './GenderSetup';
import NewProfileStart from './NewProfileStart';
import PersonalInfoSetup from './PersonalInfoSetup';

export type NewUserProps = {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: { gender: string; identities: string[] };
};

const NewUserSetup = () => {
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
              paddingVertical: theme.spacing.xxl,
              paddingHorizontal: theme.spacing.md,
            }}
          >
            {currentScreen === NewProfileScreenEnum.START && (
              <NewProfileStart navigator={setCurrentScreen} />
            )}
            {currentScreen === NewProfileScreenEnum.PERSONAL_INFO && (
              <PersonalInfoSetup navigator={setCurrentScreen} />
            )}
            {currentScreen === NewProfileScreenEnum.DATE_OF_BIRTH && (
              <DateOfBirthSetup navigator={setCurrentScreen} />
            )}
            {currentScreen === NewProfileScreenEnum.GENDER && (
              <GenderSetup navigator={setCurrentScreen} />
            )}
          </View>
        </Formik>
      </SafeAreaView>
    </View>
    // <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
    //   <SafeAreaView style={{ flex: 1, paddingVertical: theme.spacing.xxl }}>
    //     <Animated.View
    //       entering={FadeIn.duration(200).delay(500)}
    //       exiting={FadeOut.duration(200).delay(400)}
    //       style={{ flex: 1 }}
    //     >
    //       {/* <Header>
    //         <Header.Title>Set up your profile</Header.Title>
    //         <Header.Description>
    //           Let's show the world who you are!
    //         </Header.Description>
    //       </Header> */}

    //       <Formik
    //         initialValues={{ firstName: '', lastName: '' }}
    //         onSubmit={() => {
    //           return;
    //         }}
    //       >
    //         <PersonalInfoForm />
    //       </Formik>
    //     </Animated.View>
    //   </SafeAreaView>
    // </View>
  );
};

export default NewUserSetup;
