import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ThemeContext } from '../../provider/ThemeProvider';
import Header from '../core/Header';
import IconButton from '../core/IconButton';

interface NewUserSetupLayoutProps {
  handleBack?: () => void;
  handleNext: () => void;
  title: string;
  description: string;
  nextDisabled: boolean;
  children?: React.ReactNode;
}

const NewUserSetupLayout = (props: NewUserSetupLayoutProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={64}
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Animated.View
          entering={FadeIn.duration(200).delay(200)}
          exiting={FadeOut.duration(200)}
          style={{ flex: 1 }}
        >
          <View style={{ paddingHorizontal: theme.spacing.md }}>
            <Header>
              <Header.Title>{props.title}</Header.Title>
              <Header.Description>{props.description}</Header.Description>
            </Header>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ marginTop: theme.spacing.xxl }} />
            {props.children}
          </View>
        </Animated.View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: props.handleBack ? 'space-between' : 'flex-end',
            marginTop: theme.spacing.lg,
            paddingHorizontal: theme.spacing.xxl,
          }}
        >
          {props.handleBack && (
            <IconButton name='arrow-left' onPress={props.handleBack} />
          )}
          <IconButton
            name='arrow-right'
            onPress={props.handleNext}
            disabled={props.nextDisabled}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewUserSetupLayout;
