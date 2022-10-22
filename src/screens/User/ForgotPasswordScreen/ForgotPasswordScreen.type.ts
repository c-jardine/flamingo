import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParams } from '../../../navigation/UserStack/UserStack.type';

export type ForgotPasswordScreenProps = NativeStackScreenProps<
  UserStackParams,
  'ForgotPassword',
  'UserStackParamList'
>;

export type ForgotPasswordScreenRouteProp = ForgotPasswordScreenProps['route'];
export type ForgotPasswordScreenNavigationProp =
  ForgotPasswordScreenProps['navigation'];
