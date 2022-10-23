import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MainStackParams from '../../../navigation/MainStack/MainStack.types';

export type ProfileScreenProps = NativeStackScreenProps<
  MainStackParams,
  'Profile',
  'MainStack'
>;

export type ProfileScreenRouteProp = ProfileScreenProps['route'];
export type ProfileScreenNavigationProp = ProfileScreenProps['navigation'];
