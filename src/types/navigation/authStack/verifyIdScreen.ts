import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../stacks';

export type VerifyIdScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'VerifyId',
  'AuthStack'
>;

export type VerifyIdScreenRouteProp = VerifyIdScreenProps['route'];
export type VerifyIdScreenNavigationProp = VerifyIdScreenProps['navigation'];
