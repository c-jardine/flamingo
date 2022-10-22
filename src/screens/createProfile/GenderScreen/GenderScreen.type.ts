import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileStackParams } from '../../../navigation/CreateProfileStack/CreateProfileStack.type';

export type GenderScreenProps = NativeStackScreenProps<
  CreateProfileStackParams,
  'Gender',
  'CreateProfile'
>;

export type GenderScreenRouteProp = GenderScreenProps['route'];
export type GenderScreenNavigationProp = GenderScreenProps['navigation'];
