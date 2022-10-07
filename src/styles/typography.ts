import { TextProps } from 'react-native';
import { Color } from './Color';

export const TYPOGRAPHY = {
  h1: {
    color: Color.text.primary,
    fontSize: 32,
    fontWeight: '700',
  } as TextProps,
  h2: {
    color: Color.accent[600],
    fontSize: 20,
    fontWeight: '400',
  } as TextProps,
  body: {
    color: Color.text.body,
  } as TextProps,
};
