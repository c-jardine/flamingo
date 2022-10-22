import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileParams } from '../../../navigation/CreateProfile/CreateProfile.type';

export type SexualOrientationScreenProps = NativeStackScreenProps<
  CreateProfileParams,
  'SexualOrientation',
  'CreateProfileStack'
>;

export type SexualOrientationScreenRouteProp =
  SexualOrientationScreenProps['route'];
export type SexualOrientationScreenNavigationProp =
  SexualOrientationScreenProps['navigation'];
