import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileParams } from '../../../navigation/CreateProfile/CreateProfile.type';

export type PersonalInfoScreenProps = NativeStackScreenProps<
  CreateProfileParams,
  'PersonalInfo',
  'CreateProfileStack'
>;

export type PersonalInfoScreenRouteProp = PersonalInfoScreenProps['route'];
export type PersonalInfoScreenNavigationProp =
  PersonalInfoScreenProps['navigation'];
