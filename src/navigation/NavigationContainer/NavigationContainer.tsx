import {
  DefaultTheme,
  NavigationContainer as RNNavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import { AuthContext, ThemeContext } from '../../providers';
import useProfile from '../../shared/hooks/useProfile';
import { AuthStack } from '../AuthStack';
import { CreateProfileStack } from '../CreateProfileStack';
import { MainStack } from '../MainStack';

const NavigationContainer = () => {
  const { theme } = React.useContext(ThemeContext);
  const { user } = React.useContext(AuthContext);
  const [loading, profile] = useProfile();

  return (
    <RNNavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.colors.background,
        },
      }}
    >
      {/* {user == null && <Loading />} */}

      {/* Not signed in forces authentication stack. */}
      {user == false && <AuthStack />}

      {/* Signed in without profile forces profile creation stack. */}
      {user == true && profile === null && <CreateProfileStack />}

      {/* Signed in with profile forces main app stack. */}
      {user == true && profile !== null && <MainStack />}
    </RNNavigationContainer>
  );
};

export default NavigationContainer;
