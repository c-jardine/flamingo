import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileStackParams } from '../../../navigation/CreateProfileStack/CreateProfileStack.type';

export type PronounsScreenProps = NativeStackScreenProps<
  CreateProfileStackParams,
  'Pronouns',
  'CreateProfileStack'
>;

export type PronounsScreenRouteProp = PronounsScreenProps['route'];
export type PronounsScreenNavigationProp = PronounsScreenProps['navigation'];
