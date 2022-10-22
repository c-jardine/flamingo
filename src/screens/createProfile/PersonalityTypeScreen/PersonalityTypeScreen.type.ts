import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileParams } from '../../../navigation/CreateProfile/CreateProfile.type';

export type PersonalityTypeScreenProps = NativeStackScreenProps<
  CreateProfileParams,
  'PersonalityType',
  'CreateProfileStack'
>;

export type PersonalityTypeScreenRouteProp =
  PersonalityTypeScreenProps['route'];
export type PersonalityTypeScreenNavigationProp =
  PersonalityTypeScreenProps['navigation'];
