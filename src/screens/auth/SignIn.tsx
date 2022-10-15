import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import SignInForm from '../../components/forms/SignInForm';
import { ThemeContext } from '../../provider/ThemeProvider';
import { AuthStackParamList } from '../../types';

const SignIn = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, 'SignIn'>) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        style={{ backgroundColor: theme.colors.background }}
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
                navigation.navigate('ForgetPassword');
              }}
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
              onPress={() => {
                navigation.navigate('SignUp');
              }}
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
    </SafeAreaView>
  );
};

export default SignIn;
