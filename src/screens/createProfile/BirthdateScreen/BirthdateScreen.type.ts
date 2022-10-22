import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileStackParams } from '../../../navigation/CreateProfileStack/CreateProfileStack.type';

export type BirthdateScreenProps = NativeStackScreenProps<
  CreateProfileStackParams,
  'Birthdate',
  'CreateProfileStack'
>;

export type BirthdateScreenRouteProp = BirthdateScreenProps['route'];
export type BirthdateScreenNavigationProp = BirthdateScreenProps['navigation'];
