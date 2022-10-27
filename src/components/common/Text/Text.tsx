import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text as RNText, TextStyle, View } from 'react-native';
import { ThemeContext } from '../../../providers';
import TextProps from './Text.types';

const _Text = (props: TextProps & { style: TextStyle }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <RNText
      style={[{ color: theme.colors.text['800'] }, props.style]}
      {...props.textProps}
    >
      {props.children}
    </RNText>
  );
};

const _Icon = (props: Pick<TextProps, 'leftIcon' | 'rightIcon'>) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <MaterialCommunityIcons
      name={props.leftIcon?.name}
      color={theme.colors.text['800']}
      size={20}
    />
  );
};

const Text = (props: TextProps & { style?: TextStyle }) => {
  const { theme } = React.useContext(ThemeContext);

  if (props.leftIcon) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: theme.spacing.sm,
        }}
      >
        <_Icon />
        <_Text>{props.children}</_Text>
      </View>
    );
  } else if (props.rightIcon) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: theme.spacing.sm,
        }}
      >
        <_Text>{props.children}</_Text>
        <_Icon />
      </View>
    );
  } else {
    return <_Text style={{ ...props.style }}>{props.children}</_Text>;
  }
};

export default Text;
