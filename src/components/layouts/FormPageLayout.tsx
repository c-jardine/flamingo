import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
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

const FormPageLayout = (
  props: Pick<ViewProps, 'children'> & { touchToCloseKeyboard?: boolean }
) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={theme.spacing.md}
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <Animated.View
          entering={FadeIn.duration(200).delay(400)}
          exiting={FadeOut.duration(200)}
          style={{ flex: 1 }}
        >
          {props.touchToCloseKeyboard !== undefined ? (
            props.touchToCloseKeyboard ? (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {props.children}
              </TouchableWithoutFeedback>
            ) : (
              <React.Fragment>{props.children}</React.Fragment>
            )
          ) : (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <React.Fragment>{props.children}</React.Fragment>
            </TouchableWithoutFeedback>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

FormPageLayout.PageHeader = PageHeader;
FormPageLayout.PageContent = PageContent;
FormPageLayout.PageFooter = PageFooter;

export default FormPageLayout;
