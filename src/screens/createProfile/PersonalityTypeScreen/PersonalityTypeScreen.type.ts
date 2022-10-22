import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileStackParams } from '../../../navigation/CreateProfileStack/CreateProfileStack.type';

export type PersonalityTypeScreenProps = NativeStackScreenProps<
  CreateProfileStackParams,
  'PersonalityType',
  'CreateProfileStack'
>;

export type PersonalityTypeScreenRouteProp =
  PersonalityTypeScreenProps['route'];
export type PersonalityTypeScreenNavigationProp =
  PersonalityTypeScreenProps['navigation'];
