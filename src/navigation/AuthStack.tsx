import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AuthScreen from '../screens/auth/AuthScreen';
import { AuthStackParamList } from '../types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name='AuthScreen' component={AuthScreen} />
      {/* <AuthStack.Screen name='SignUp' component={SignUp} /> */}
      {/* <AuthStack.Screen name='ForgetPassword' component={ForgetPassword} /> */}
      {/* <AuthStack.Screen name='VerifyId' component={IDVerification} /> */}
    </AuthStack.Navigator>
  );
};

export default Auth;
