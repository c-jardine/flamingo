import { ImageProps, ImageStyle } from 'react-native';

export type PhotoProps = Omit<ImageProps, 'source'> & {
  path: string;
  imgStyle: ImageStyle;
};
