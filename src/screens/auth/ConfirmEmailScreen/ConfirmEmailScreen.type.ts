import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParams } from '../../../navigation/AuthStack/AuthStack.type';

export type ConfirmEmailScreenProps = NativeStackScreenProps<
  UserStackParams,
  'ConfirmEmail',
  'UserStackParamList'
>;

export type ConfirmEmailScreenRouteProp = ConfirmEmailScreenProps['route'];
export type ConfirmEmailScreenNavigationProp =
  ConfirmEmailScreenProps['navigation'];
