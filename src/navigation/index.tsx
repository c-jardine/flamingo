import React from 'react';
import { AuthContext } from '../provider/AuthProvider';

import { NavigationContainer } from '@react-navigation/native';

import Loading from '../screens/utils/Loading';
import Auth from './AuthStack';
import Main from './MainStack';

export default () => {
  const { user, profile } = React.useContext(AuthContext);
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
