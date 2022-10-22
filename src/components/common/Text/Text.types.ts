import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextProps as RNTextProps } from 'react-native';

type TextProps = {
  textProps?: RNTextProps;
  leftIcon?: IconProps;
  rightIcon?: IconProps;
  children: React.ReactNode;
};

type IconProps = {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
};

export default TextProps;
