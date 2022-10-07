import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../stacks';

export type EditProfileScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'EditProfile',
  'MainStack'
>;

export type EditProfileScreenRouteProp = EditProfileScreenProps['route'];
export type EditProfileScreenNavigationProp =
  EditProfileScreenProps['navigation'];
