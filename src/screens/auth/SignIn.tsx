import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SignInForm from '../../components/forms/SignInForm';

import { Color } from '../../styles/Color';

import { AuthStackParamList } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, 'SignIn'>) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.base }}>
      <ScrollView
        style={{ backgroundColor: Color.base }}
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
              <Text style={{ color: Color.primary, textAlign: 'center' }}>
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
            <Text style={{ color: Color.text.body }}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            >
              <Text
                style={{
                  color: Color.primary,
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
