import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { Text } from '../Text';
import {
  MenuContainerProps,
  MenuContainerTitleProps
} from './MenuContainer.types';

const Title = (props: MenuContainerTitleProps) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons
          name={props.icon}
          color={theme.colors.text['600']}
          size={24}
        />
        <Text
          style={{
            ...theme.textVariants.subtitle,
            marginLeft: theme.spacing.sm,
          }}
        >
          {props.children}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: theme.colors.text['50'],
          marginTop: theme.spacing.sm,
        }}
      />
    </View>
  );
};

const MenuContainer = (props: MenuContainerProps) => {
  return <View style={{ flex: 1 }}>{props.children}</View>;
};

MenuContainer.Title = Title;
export default MenuContainer;
