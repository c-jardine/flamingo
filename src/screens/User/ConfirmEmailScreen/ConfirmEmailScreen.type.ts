import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParams } from '../../../navigation/UserStack/UserStack.type';

export type ConfirmEmailScreenProps = NativeStackScreenProps<
  UserStackParams,
  'ConfirmEmail',
  'UserStackParamList'
>;

export type ConfirmEmailScreenRouteProp = ConfirmEmailScreenProps['route'];
export type ConfirmEmailScreenNavigationProp =
  ConfirmEmailScreenProps['navigation'];
