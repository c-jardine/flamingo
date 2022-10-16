import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import ForgetPassword from '../screens/auth/ForgetPassword';
import IDVerification from '../screens/auth/IDVerification';
import { AuthStackParamList } from '../types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name='SignIn' component={SignIn} />
      <AuthStack.Screen name='SignUp' component={SignUp} />
      <AuthStack.Screen name='ForgetPassword' component={ForgetPassword} />
      <AuthStack.Screen name='VerifyId' component={IDVerification} />
    </AuthStack.Navigator>
  );
};

export default Auth;
