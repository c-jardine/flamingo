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
      props.backComponent?.visible || true ? 'space-between' : 'flex-end',
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  };
};
