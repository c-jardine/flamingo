import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/core/Header';
import SignUpForm from '../../components/forms/SignUpForm';
import BackHeader from '../../components/utils/BackHeader';
import { ThemeContext } from '../../provider/ThemeProvider';
import { AuthStackParamList } from '../../types';

const SignUp = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, 'SignUp'>) => {
  const { theme } = React.useContext(ThemeContext);

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <BackHeader handleBack={() => navigation.navigate('SignIn')} />

      <ScrollView
        style={{
          backgroundColor: theme.colors.background,
        }}
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
            <SignUpForm />
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
                  navigation.navigate('SignIn');
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
    </SafeAreaView>
  );
};

export default SignUp;
