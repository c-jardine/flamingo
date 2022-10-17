import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthScreensEnum } from '../../enums/AuthScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Verification from './Verification';

const AuthScreen = () => {
  const { theme } = React.useContext(ThemeContext);
  const [currentScreen, setCurrentScreen] = React.useState<AuthScreensEnum>(
    AuthScreensEnum.SIGN_IN
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaView style={{ flex: 1 }}>
        {currentScreen === AuthScreensEnum.SIGN_IN && (
          <SignIn navigator={setCurrentScreen} />
        )}
        {currentScreen === AuthScreensEnum.SIGN_UP && (
          <SignUp navigator={setCurrentScreen} />
        )}
        {currentScreen === AuthScreensEnum.VERIFY_IDENTITY && (
          <Verification navigator={setCurrentScreen} />
        )}
      </SafeAreaView>
    </View>
  );
};
export default AuthScreen;
