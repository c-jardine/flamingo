import React from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/core/Header';
import ProfileForm from '../../components/forms/ProfileForm';
import BackHeader from '../../components/utils/BackHeader';
import { Color } from '../../styles/Color';
import { EditProfileScreenNavigationProp } from '../../types';

const EditProfile = ({
  navigation,
}: {
  navigation: EditProfileScreenNavigationProp;
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: Color.base,
      }}
    >
      <BackHeader handleBack={() => navigation.goBack()} />
      <ScrollView
        horizontal={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps={'handled'}
      >
        <KeyboardAvoidingView behavior='padding' enabled>
          <Header>
            <Header.Title>Update your profile</Header.Title>
            <Header.Description>Help others get to know you</Header.Description>
          </Header>
          <View style={{ height: 32 }} />
          <ProfileForm />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
