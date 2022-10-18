import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/core/Header';
import BackHeader from '../../components/utils/BackHeader';
import { ThemeContext } from '../../provider/ThemeProvider';
import { signOut } from '../../services/auth.service';
import PersonalInfoForm from '../newUser/PersonalInfoForm';

const NewUserSetup = () => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <BackHeader handleBack={() => signOut()} />
        <Animated.View
          entering={FadeIn.duration(200).delay(500)}
          exiting={FadeOut.duration(200).delay(400)}
          style={{ flex: 1 }}
        >
          <Header>
            <Header.Title>Set up your profile</Header.Title>
            <Header.Description>
              Let's show the world who you are!
            </Header.Description>
          </Header>

          <View
            style={{
              flex: 1,
              marginTop: 32,
            }}
          >
            <Formik
              initialValues={{ firstName: '', lastName: '' }}
              onSubmit={() => {
                return;
              }}
            >
              <PersonalInfoForm />
            </Formik>
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default NewUserSetup;
