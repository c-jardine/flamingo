import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { SafeAreaView } from 'react-native-safe-area-context';
import SignInForm from '../../components/forms/SignInForm';
import { AuthScreensEnum } from '../../enums/AuthScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { AuthScreenNavigatorProps } from '../../types/auth/AuthScreen';

const SignIn = (props: AuthScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View
        entering={FadeIn.duration(200).delay(400)}
        exiting={FadeOut.duration(200).delay(400)}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 64,
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
          <KeyboardAvoidingView
            behavior='padding'
            enabled
            style={{ flex: 1, justifyContent: 'space-between' }}
          >
            <View>
              <SignInForm />
              <TouchableOpacity
                onPress={() => {
                  props.navigator(AuthScreensEnum.FORGOT_PASSWORD);
                }}
                style={{ marginTop: theme.spacing.sm }}
              >
                <Text
                  style={{ color: theme.colors.primary, textAlign: 'center' }}
                >
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>

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
          </KeyboardAvoidingView>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default SignIn;
