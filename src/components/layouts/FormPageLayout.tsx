import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ThemeContext } from '../../provider/ThemeProvider';
import Header from '../core/Header';

interface FormPageLayoutProps {
  handleBack?: () => void;
  handleNext?: () => void;
  title?: string;
  description?: string;
  nextDisabled?: boolean;
  children?: React.ReactNode;
}

const PageHeader = (
  props: ViewProps & { title: string; description: string }
) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View
      style={{
        paddingHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.md,
      }}
    >
      <Header>
        <Header.Title>{props.title}</Header.Title>
        <Header.Description>{props.description}</Header.Description>
      </Header>
    </View>
  );
};

const PageContent = (
  props: ViewProps & { contentContainerStyle?: ViewStyle }
) => {
  return (
    <View style={[{ flex: 1 }, props.contentContainerStyle]}>
      {props.children}
    </View>
  );
};

const PageFooter = (props: Pick<ViewProps, 'children'>) => {
  return <View>{props.children}</View>;
};

const FormPageLayout = (props: Pick<ViewProps, 'children'>) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={theme.spacing.md}
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <Animated.View
        entering={FadeIn.duration(200).delay(200)}
        exiting={FadeOut.duration(200)}
        style={{ flex: 1 }}
      >
        {props.children}
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

FormPageLayout.PageHeader = PageHeader;
FormPageLayout.PageContent = PageContent;
FormPageLayout.PageFooter = PageFooter;

export default FormPageLayout;
