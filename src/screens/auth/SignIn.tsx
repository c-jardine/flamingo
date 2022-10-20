import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import SignInForm from '../../components/forms/SignInForm';
import { AuthScreensEnum } from '../../enums/AuthScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { AuthScreenNavigatorProps } from '../../types/auth/AuthScreen';

const SignIn = (props: AuthScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <Animated.View
      entering={FadeIn.duration(200).delay(400)}
      exiting={FadeOut.duration(200).delay(400)}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={32}
        style={{
          flex: 1,
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                resizeMode='contain'
                style={{
                  height: 100,
                  width: 100,
                }}
                source={require('../../../assets/images/icon.png')}
              />
            </View>
            <SignInForm navigator={props.navigator} />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: theme.colors.text['300'] }}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => props.navigator(AuthScreensEnum.SIGN_UP)}
              >
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: 'bold',
                  }}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default SignIn;
