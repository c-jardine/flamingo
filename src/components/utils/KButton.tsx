import { Color, withOpacity } from '../../styles/Color';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
const KButton = (
  props: TouchableOpacityProps & { loading: boolean; label: string }
) => {
  return (
    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
      <TouchableOpacity
        {...props}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: props.loading
            ? withOpacity(Color.primary, 0.3)
            : Color.primary,
          height: 52,
          width: '50%',
          borderWidth: 0,
          borderRadius: 32,
          marginTop: 32,
        }}
        disabled={props.loading}
        onPress={props.onPress}
      >
        <Text
          style={{
            color: props.loading ? Color.text.body : Color.black,
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          {props.loading ? 'Loading' : props.label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default KButton;
