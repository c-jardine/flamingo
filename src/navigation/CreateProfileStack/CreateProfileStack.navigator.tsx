import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  BirthdateScreen,
  GenderScreen,
  IdVerificationScreen,
  InfoScreen,
  PersonalInfoScreen,
  PersonalityTypeScreen,
  PhotoVerificationScreen,
  PronounsScreen,
  SexualOrientationScreen,
} from '../../screens/createProfile';
import { CreateProfileStackParams } from './CreateProfileStack.type';

const Stack = createNativeStackNavigator<CreateProfileStackParams>();

const CreateProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'simple_push' }}
    >
      <Stack.Screen name='Info' component={InfoScreen} />
      <Stack.Screen name='IdVerification' component={IdVerificationScreen} />
      <Stack.Screen
        name='PhotoVerification'
        component={PhotoVerificationScreen}
      />
      <Stack.Screen name='PersonalInfo' component={PersonalInfoScreen} />
      <Stack.Screen name='Birthdate' component={BirthdateScreen} />
      <Stack.Screen name='Gender' component={GenderScreen} />
      <Stack.Screen name='Pronouns' component={PronounsScreen} />
      <Stack.Screen
        name='SexualOrientation'
        component={SexualOrientationScreen}
      />
      <Stack.Screen name='PersonalityType' component={PersonalityTypeScreen} />
    </Stack.Navigator>
  );
};
export default CreateProfileNavigator;
