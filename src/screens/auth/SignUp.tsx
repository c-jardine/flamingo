import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Header from '../../components/core/Header';
import SignUpForm from '../../components/forms/SignUpForm';
import BackHeader from '../../components/utils/BackHeader';
import { AuthScreensEnum } from '../../enums/AuthScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { AuthScreenNavigatorProps } from '../../types/auth/AuthScreen';

const SignUp = (props: AuthScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View style={{ flex: 1 }}>
      <BackHeader handleBack={() => props.navigator(AuthScreensEnum.SIGN_IN)} />
      <Animated.View
        entering={FadeIn.duration(200).delay(500)}
        exiting={FadeOut.duration(200).delay(400)}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <KeyboardAvoidingView behavior='padding' enabled style={{ flex: 1 }}>
            <Header>
              <Header.Title>Create an account</Header.Title>
              <Header.Description>
                Fill in the form to continue
              </Header.Description>
            </Header>

            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                marginTop: 32,
              }}
            >
              <SignUpForm navigator={props.navigator} />
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 16,
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: theme.colors.text['400'] }}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    props.navigator(AuthScreensEnum.SIGN_IN);
                  }}
                >
                  <Text
                    style={{ color: theme.colors.primary, fontWeight: 'bold' }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default SignUp;
