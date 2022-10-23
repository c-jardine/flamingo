import React from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from '../../../providers';
import {
  HeaderDescriptionProps,
  HeaderProps,
  HeaderTitleProps,
} from './Header.types';

const Title = (props: HeaderTitleProps) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <Text
      style={{ ...theme.textVariants.title, color: theme.colors.text['800'] }}
    >
      {props.children}
    </Text>
  );
};

const Description = (props: HeaderDescriptionProps) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <Text
      style={{
        fontSize: 16,
        color: theme.colors.text['300'],
      }}
    >
      {props.children}
    </Text>
  );
};

const Header = (props: HeaderProps) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <View
      style={[
        {
          marginTop: theme.spacing.sm,
        },
        { ...props.contentContainerStyle },
      ]}
    >
      {props.children}
    </View>
  );
};

Header.Title = Title;
Header.Description = Description;

export default Header;
