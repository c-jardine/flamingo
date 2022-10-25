import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateProfileStackParams } from '../../../navigation/CreateProfileStack/CreateProfileStack.type';

export type PhotoUploadScreenProps = NativeStackScreenProps<
  CreateProfileStackParams,
  'PhotoUpload',
  'CreateProfileStack'
>;

export type PhotoUploadScreenRouteProp = PhotoUploadScreenProps['route'];
export type PhotoUploadScreenNavigationProp =
  PhotoUploadScreenProps['navigation'];
