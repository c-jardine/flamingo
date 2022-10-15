import { TextProps } from 'react-native';
import { color } from './color';
import { spacing } from './spacing';

export const darkTheme = {
  colors: {
    black: color.black,
    white: color.white,
    transparent: color.transparent,
    background: color.darkBlue,
    foreground: color.white,
    primary: color.primary,
    success: color.green,
    warning: color.yellow,
    error: color.red,
    text: color.basePrimary,
  },
  spacing: {
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing.xl,
    xxl: spacing.xxl,
  },
  textVariants: {
    title: {
      fontSize: 32,
      fontWeight: '700',
    } as TextProps,
    subtitle: {
      fontSize: 20,
      fontWeight: '400',
    } as TextProps,
    body: {} as TextProps,
  },
};

export const lightTheme = {};
