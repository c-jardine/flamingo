import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ViewStyle } from 'react-native';

// Base props shared by all buttons
type NavButtonProps = {
  visible?: boolean;
  disabled?: boolean;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  render?: React.ReactNode;
};

export type ArrowNavigatorProps = {
  contentContainerStyle?: ViewStyle;
  backComponent?: {
    onPress?: () => void;
  } & NavButtonProps;
  nextComponent?: {
    onPress?: () => void;
  } & NavButtonProps;
};
