import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacityProps, ViewStyle } from 'react-native';

type IconButtonProps = {
  contentContainerProps?: TouchableOpacityProps;
  contentContainerStyle?: ViewStyle;
  iconProps?: React.ComponentProps<typeof MaterialCommunityIcons>;
};

export default IconButtonProps;
