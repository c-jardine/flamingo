import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileParams } from '../../../navigation/CreateProfile/CreateProfile.type';

export type GenderScreenProps = NativeStackScreenProps<
  CreateProfileParams,
  'Gender',
  'CreateProfile'
>;

export type GenderScreenRouteProp = GenderScreenProps['route'];
export type GenderScreenNavigationProp = GenderScreenProps['navigation'];
