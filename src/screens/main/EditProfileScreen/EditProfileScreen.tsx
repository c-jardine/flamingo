import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../../components/common';
import { EditProfile } from '../../../components/editProfile';
import { ThemeContext } from '../../../providers';

const EditProfileScreen = () => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* <ScrollView
        horizontal={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps={'handled'}
      > */}
      {/* <KeyboardAvoidingView behavior='padding' enabled style={{flex: 1}}> */}
      <Header>
        <Header.Title>Update your profile</Header.Title>
        <Header.Description>Help others get to know you</Header.Description>
      </Header>
      <View style={{ height: 32 }} />
      <EditProfile />
      {/* </KeyboardAvoidingView> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default EditProfileScreen;
