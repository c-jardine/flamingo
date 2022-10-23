import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MainStackParams from '../../../navigation/MainStack/MainStack.types';

export type PhotoAlbumScreenProps = NativeStackScreenProps<
  MainStackParams,
  'PhotoAlbum',
  'MainStack'
>;

export type PhotoAlbumScreenRouteProp = PhotoAlbumScreenProps['route'];
export type PhotoAlbumScreenNavigationProp =
  PhotoAlbumScreenProps['navigation'];
