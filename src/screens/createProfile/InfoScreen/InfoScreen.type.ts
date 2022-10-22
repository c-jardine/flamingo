import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileParams } from '../../../navigation/CreateProfile/CreateProfile.type';

export type InfoScreenProps = NativeStackScreenProps<
  CreateProfileParams,
  'Info',
  'CreateProfileStack'
>;

export type InfoScreenRouteProp = InfoScreenProps['route'];
export type InfoScreenNavigationProp = InfoScreenProps['navigation'];
