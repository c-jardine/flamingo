import React from 'react';
import { AuthContext } from '../provider/AuthProvider';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { Formik } from 'formik';
import { ThemeContext } from '../provider/ThemeProvider';
import Loading from '../screens/utils/Loading';
import Auth from './AuthStack';
import CreateProfile from './CreateProfile/CreateProfile';
import { CreateProfileSchema } from './CreateProfile/CreateProfile.schema';
import { CreateProfileProps } from './CreateProfile/CreateProfile.type';
import Main from './MainStack';

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
      {user == false && <Auth />}
      {user == true && profile === null && (
        <Formik
          validationSchema={CreateProfileSchema}
          initialValues={
            {
              firstName: '',
              lastName: '',
              dob: new Date(),
              gender: {
                gender: null,
                identities: [],
              },
            } as CreateProfileProps
          }
          validateOnMount
        >
          <CreateProfile />
        </Formik>
      )}
      {user == true && profile !== null && <Main />}
    </NavigationContainer>
  );
};
