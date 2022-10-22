import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileStackParams } from '../../../navigation/CreateProfileStack/CreateProfileStack.type';

export type InfoScreenProps = NativeStackScreenProps<
  CreateProfileStackParams,
  'Info',
  'CreateProfileStack'
>;

export type InfoScreenRouteProp = InfoScreenProps['route'];
export type InfoScreenNavigationProp = InfoScreenProps['navigation'];
