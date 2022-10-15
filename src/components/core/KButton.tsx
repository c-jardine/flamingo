import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const KButton = (
  props: TouchableOpacityProps & { loading: boolean; label: string }
) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
      <TouchableOpacity
        {...props}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: props.loading
            ? theme.colors.text['300']
            : theme.colors.primary,
          height: 52,
          width: '50%',
          borderWidth: 0,
          borderRadius: 32,
          marginTop: theme.spacing.xl,
        }}
        disabled={props.loading}
        onPress={props.onPress}
      >
        <Text
          style={{
            color: props.loading
              ? theme.colors.text['300']
              : theme.colors.black,
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
