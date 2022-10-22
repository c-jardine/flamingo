import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileStackParams } from '../../../navigation/CreateProfileStack/CreateProfileStack.type';

export type PersonalInfoScreenProps = NativeStackScreenProps<
  CreateProfileStackParams,
  'PersonalInfo',
  'CreateProfileStack'
>;

export type PersonalInfoScreenRouteProp = PersonalInfoScreenProps['route'];
export type PersonalInfoScreenNavigationProp =
  PersonalInfoScreenProps['navigation'];
