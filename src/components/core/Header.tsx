import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const Title = ({ children }: { children: string }) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <Text
      style={{ ...theme.textVariants.title, color: theme.colors.text['800'] }}
    >
      {children}
    </Text>
  );
};

const Description = ({ children }: { children: string }) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <Text
      style={{
        fontSize: 16,
        color: theme.colors.text['300'],
      }}
    >
      {children}
    </Text>
  );
};

const Header = (props: ViewProps) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <View
      style={[
        {
          marginTop: theme.spacing.sm,
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
};

Header.Title = Title;
Header.Description = Description;

export default Header;
