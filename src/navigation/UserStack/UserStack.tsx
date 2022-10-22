import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  ConfirmEmailScreen,
  ForgotPasswordScreen,
  SignInScreen,
  SignUpScreen,
} from '../../screens/User';
import { UserStackParams } from './UserStack.type';

const Stack = createNativeStackNavigator<UserStackParams>();

const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='SignIn' component={SignInScreen} />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
      <Stack.Screen name='ConfirmEmail' component={ConfirmEmailScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default UserStack;
