import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';

import { Color } from '../../styles/Color';

import { TYPOGRAPHY } from '../../styles/typography';

const MenuItem = ({
  children,
  onPress,
  iconStyle,
}: {
  children: any;
  onPress: () => void;
  iconStyle?: any;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          ...TYPOGRAPHY.body,
        }}
      >
        {children}
      </Text>
      <MaterialCommunityIcons
        name='chevron-right'
        size={28}
        color={Color.text.body}
        {...iconStyle}
      />
    </TouchableOpacity>
  );
};
export default MenuItem;
