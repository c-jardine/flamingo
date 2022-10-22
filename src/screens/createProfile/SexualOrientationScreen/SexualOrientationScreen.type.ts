import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileStackParams } from '../../../navigation/CreateProfileStack/CreateProfileStack.type';

export type SexualOrientationScreenProps = NativeStackScreenProps<
  CreateProfileStackParams,
  'SexualOrientation',
  'CreateProfileStack'
>;

export type SexualOrientationScreenRouteProp =
  SexualOrientationScreenProps['route'];
export type SexualOrientationScreenNavigationProp =
  SexualOrientationScreenProps['navigation'];
