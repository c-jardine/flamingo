import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../stacks';

export type ProfileScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Profile',
  'MainStack'
>;

export type ProfileScreenRouteProp = ProfileScreenProps['route'];
export type ProfileScreenNavigationProp = ProfileScreenProps['navigation'];
