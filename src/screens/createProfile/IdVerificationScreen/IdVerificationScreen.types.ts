import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileStackParams } from '../../../navigation/CreateProfileStack/CreateProfileStack.type';

export type IdVerificationScreenProps = NativeStackScreenProps<
  CreateProfileStackParams,
  'IdVerification',
  'CreateProfileStack'
>;

export type IdVerificationScreenRouteProp = IdVerificationScreenProps['route'];
export type IdVerificationScreenNavigationProp =
  IdVerificationScreenProps['navigation'];
