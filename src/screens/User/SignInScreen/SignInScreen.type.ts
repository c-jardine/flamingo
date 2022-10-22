import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParams } from '../../../navigation/UserStack/UserStack.type';

export type SignInScreenProps = NativeStackScreenProps<
  UserStackParams,
  'SignIn',
  'UserStackParamList'
>;

export type SignInScreenRouteProp = SignInScreenProps['route'];
export type SignInScreenNavigationProp = SignInScreenProps['navigation'];
