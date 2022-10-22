import { ViewProps, ViewStyle } from 'react-native';

export type FormPageLayoutProps = Pick<ViewProps, 'children'> & {
  touchToCloseKeyboard?: boolean;
};

export type FormPageLayoutHeaderProps = {
  title: string;
  description: string;
};

export type FormPageLayoutContentProps = {
  contentContainerStyle?: ViewStyle;
  children?: React.ReactNode;
};
