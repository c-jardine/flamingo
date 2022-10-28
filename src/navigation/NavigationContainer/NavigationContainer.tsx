import {
  DefaultTheme,
  NavigationContainer as RNNavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import { LoadingOverlay } from '../../components/common';
import { AuthContext, ThemeContext } from '../../providers';
import { RootState } from '../../redux/store';
import useProfile from '../../shared/hooks/useProfile';
import { AuthStack } from '../AuthStack';
import { CreateProfileStack } from '../CreateProfileStack';
import { MainStack } from '../MainStack';

const NavigationContainer = () => {
  const { theme } = React.useContext(ThemeContext);
  const { user } = React.useContext(AuthContext);
  const [loading, profile] = useProfile();

  const isLoading = useSelector((state: RootState) => state.appReducer.loading);

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
      {isLoading && <LoadingOverlay />}
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
