import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { ThemeContext } from '../provider/ThemeProvider';
import Loading from '../screens/utils/Loading';
import CreateProfileStack from './CreateProfileStack/CreateProfileStack';
import Main from './MainStack';
import UserStack from './UserStack/UserStack.navigator';

export default () => {
  const { theme } = React.useContext(ThemeContext);
  const { user, profile } = React.useContext(AuthContext);

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.colors.background,
        },
      }}
    >
      {user == null && <Loading />}

      {/* Not signed in forces authentication stack. */}
      {user == false && <UserStack />}

      {/* Signed in without profile forces profile creation stack. */}
      {user == true && profile === null && <CreateProfileStack />}

      {/* Signed in with profile forces main app stack. */}
      {user == true && profile !== null && <Main />}
    </NavigationContainer>
  );
};
