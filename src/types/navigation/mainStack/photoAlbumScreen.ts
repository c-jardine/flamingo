import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../stacks';

export type PhotoAlbumScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'PhotoAlbum',
  'MainStack'
>;

export type PhotoAlbumScreenRouteProp = PhotoAlbumScreenProps['route'];
export type PhotoAlbumScreenNavigationProp =
  PhotoAlbumScreenProps['navigation'];
