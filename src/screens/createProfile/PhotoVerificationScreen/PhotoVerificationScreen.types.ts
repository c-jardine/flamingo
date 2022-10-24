import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileStackParams } from '../../../navigation/CreateProfileStack/CreateProfileStack.type';

export type PhotoVerificationScreenProps = NativeStackScreenProps<
  CreateProfileStackParams,
  'PhotoVerification',
  'CreateProfileStack'
>;

export type PhotoVerificationScreenRouteProp =
  PhotoVerificationScreenProps['route'];
export type PhotoVerificationScreenNavigationProp =
  PhotoVerificationScreenProps['navigation'];
