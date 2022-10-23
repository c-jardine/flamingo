import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParams } from '../../../navigation/AuthStack/AuthStack.type';

export type ForgotPasswordScreenProps = NativeStackScreenProps<
  UserStackParams,
  'ForgotPassword',
  'UserStackParamList'
>;

export type ForgotPasswordScreenRouteProp = ForgotPasswordScreenProps['route'];
export type ForgotPasswordScreenNavigationProp =
  ForgotPasswordScreenProps['navigation'];
