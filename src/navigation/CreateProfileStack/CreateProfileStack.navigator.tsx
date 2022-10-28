import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../providers';
import { setIsVerified } from '../../redux/slices/verificationSlice';
import { RootState } from '../../redux/store';
import {
  BirthdateScreen,
  GenderScreen,
  IdVerificationScreen,
  InfoScreen,
  PersonalInfoScreen,
  PersonalityTypeScreen,
  PhotoUploadScreen,
  PhotoVerificationScreen,
  PronounsScreen,
  SexualOrientationScreen,
} from '../../screens/createProfile';
import { supabase } from '../../supabase/supabase';
import { CreateProfileStackParams } from './CreateProfileStack.type';

const Stack = createNativeStackNavigator<CreateProfileStackParams>();

const CreateProfileNavigator = () => {
  const { session } = React.useContext(AuthContext);

  const dispatch = useDispatch();
  const isVerified = useSelector(
    (state: RootState) => state.verificationReducer.isVerified
  );

  React.useEffect(() => {
    const userId = session?.user.id;
    userId !== undefined &&
      (async () => {
        const { data, error } = await supabase
          .from('verified_users')
          .select('*')
          .eq('id', userId)
          .single();
        dispatch(setIsVerified(!!data));
      })();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'simple_push' }}
    >
      {!isVerified && (
        <>
          <Stack.Screen name='Info' component={InfoScreen} />
          <Stack.Screen
            name='IdVerification'
            component={IdVerificationScreen}
          />
          <Stack.Screen
            name='PhotoVerification'
            component={PhotoVerificationScreen}
          />
        </>
      )}
      {isVerified && (
        <>
          <Stack.Screen name='PersonalInfo' component={PersonalInfoScreen} />
          <Stack.Screen name='Birthdate' component={BirthdateScreen} />
          <Stack.Screen name='Gender' component={GenderScreen} />
          <Stack.Screen name='Pronouns' component={PronounsScreen} />
          <Stack.Screen
            name='SexualOrientation'
            component={SexualOrientationScreen}
          />
          <Stack.Screen
            name='PersonalityType'
            component={PersonalityTypeScreen}
          />
          <Stack.Screen name='PhotoUpload' component={PhotoUploadScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
export default CreateProfileNavigator;
