import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MainStackParams from '../../../navigation/MainStack/MainStack.types';

export type EditProfileScreenProps = NativeStackScreenProps<
  MainStackParams,
  'EditProfile',
  'MainStack'
>;

export type EditProfileScreenRouteProp = EditProfileScreenProps['route'];
export type EditProfileScreenNavigationProp =
  EditProfileScreenProps['navigation'];
