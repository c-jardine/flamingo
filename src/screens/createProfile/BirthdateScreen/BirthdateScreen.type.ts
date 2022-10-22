import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileParams } from '../../../navigation/CreateProfile/CreateProfile.type';

export type BirthdateScreenProps = NativeStackScreenProps<
  CreateProfileParams,
  'Birthdate',
  'CreateProfileStack'
>;

export type BirthdateScreenRouteProp = BirthdateScreenProps['route'];
export type BirthdateScreenNavigationProp = BirthdateScreenProps['navigation'];
