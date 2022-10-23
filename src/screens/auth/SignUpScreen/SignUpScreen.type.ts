import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParams } from '../../../navigation/AuthStack/AuthStack.type';

export type SignUpScreenProps = NativeStackScreenProps<
  UserStackParams,
  'SignUp',
  'UserStackParamList'
>;

export type SignUpScreenRouteProp = SignUpScreenProps['route'];
export type SignUpScreenNavigationProp = SignUpScreenProps['navigation'];
