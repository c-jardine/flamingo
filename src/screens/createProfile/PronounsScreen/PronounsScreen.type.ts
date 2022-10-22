import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileParams } from '../../../navigation/CreateProfile/CreateProfile.type';

export type PronounsScreenProps = NativeStackScreenProps<
  CreateProfileParams,
  'Pronouns',
  'CreateProfileStack'
>;

export type PronounsScreenRouteProp = PronounsScreenProps['route'];
export type PronounsScreenNavigationProp = PronounsScreenProps['navigation'];
