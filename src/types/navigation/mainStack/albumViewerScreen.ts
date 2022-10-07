import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../stacks';

export type AlbumViewScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'PhotoAlbum',
  'MainStack'
>;

export type AlbumViewerScreenRouteProp = AlbumViewScreenProps['route'];
export type AlbumViewerScreenNavigationProp =
  AlbumViewScreenProps['navigation'];
