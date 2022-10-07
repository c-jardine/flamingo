import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { supabase } from '../../initSupabase';

import { AuthStackParamList } from '../../types';

export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, 'ForgetPassword'>) {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function forget() {
    setLoading(true);
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      email
    );
    if (!error) {
      setLoading(false);
      alert('Check your email to reset your password!');
    }
    if (error) {
      setLoading(false);
      alert(error.message);
    }
  }
  return (
    <KeyboardAvoidingView behavior='height' enabled style={{ flex: 1 }}>
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
          }}
        >
          <Image
            resizeMode='contain'
            style={{
              height: 220,
              width: 220,
            }}
            source={require('../../../assets/images/forget.png')}
          />
        </View>
        <View
          style={{
            flex: 3,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              alignSelf: 'center',
              padding: 30,
            }}
          >
            Forget Password
          </Text>
          <Text>Email</Text>
          <TextInput
            placeholder='Enter your email'
            value={email}
            autoCapitalize='none'
            autoCompleteType='off'
            autoCorrect={false}
            keyboardType='email-address'
            onChangeText={(text) => setEmail(text)}
          />
          {/* <Button
            title={loading ? 'Loading' : 'Send email'}
            onPress={() => {
              forget();
            }}
            disabled={loading}
          /> */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
              justifyContent: 'center',
            }}
          >
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            >
              <Text
                style={{
                  marginLeft: 5,
                }}
              >
                Login here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
