import { MaterialCommunityIcons } from '@expo/vector-icons';

type ToggleButtonProps = {
  isEnabled: boolean;
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  handleAction: () => void;
};

export default ToggleButtonProps;
