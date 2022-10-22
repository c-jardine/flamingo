import React from 'react';
import { ViewStyle } from 'react-native';

export type HeaderTitleProps = {
  children: string;
};

export type HeaderDescriptionProps = {
  children: string;
};

export type HeaderProps = {
  contentContainerStyle?: ViewStyle;
  children: React.ReactNode;
};
