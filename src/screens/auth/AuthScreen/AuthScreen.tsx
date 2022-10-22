import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../../../provider/ThemeProvider';
import EmailConfirmationScreen from '../EmailConfirmationScreen/EmailConfirmationScreen';
import SignInScreen from '../SignInScreen/SignInScreen';
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import Verification from '../Verification';
import { AuthScreenEnum } from './AuthScreen.type';

const AuthScreen = () => {
  const { theme } = React.useContext(ThemeContext);

  const [currentScreen, setCurrentScreen] = React.useState<AuthScreenEnum>(
    AuthScreenEnum.SIGN_IN_SCREEN
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaView style={{ flex: 1 }}>
        {currentScreen === AuthScreenEnum.SIGN_IN_SCREEN && (
          <SignInScreen navigator={setCurrentScreen} />
        )}
        {currentScreen === AuthScreenEnum.SIGN_UP_SCREEN && (
          <SignUpScreen navigator={setCurrentScreen} />
        )}
        {currentScreen === AuthScreenEnum.EMAIL_VERIFICATION_SCREEN && (
          <EmailConfirmationScreen navigator={setCurrentScreen} />
        )}
        {currentScreen === AuthScreenEnum.VERIFY_IDENTITY_SCREEN && (
          <Verification navigator={setCurrentScreen} />
        )}
      </SafeAreaView>
    </View>
  );
};
export default AuthScreen;
