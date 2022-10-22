import React from 'react';
import { ViewStyle } from 'react-native';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { ArrowNavigatorProps } from './ArrowNavigator.type';

export const defaultContentContainerStyle = (
  props: ArrowNavigatorProps
): ViewStyle => {
  const { theme } = React.useContext(ThemeContext);

  return {
    flexDirection: 'row',
    justifyContent:
      props.backComponent?.visible !== undefined
        ? props.backComponent.visible
          ? 'space-between'
          : 'flex-end'
        : 'space-between',
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  };
};
