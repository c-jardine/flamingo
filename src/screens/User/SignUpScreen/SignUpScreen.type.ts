import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParams } from '../../../navigation/UserStack/UserStack.type';

export type SignUpScreenProps = NativeStackScreenProps<
  UserStackParams,
  'SignUp',
  'UserStackParamList'
>;

export type SignUpScreenRouteProp = SignUpScreenProps['route'];
export type SignUpScreenNavigationProp = SignUpScreenProps['navigation'];
