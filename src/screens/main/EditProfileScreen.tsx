import React from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/common/Header/Header';
import EditProfile from '../../components/editProfile/EditProfile/EditProfile';
import { ThemeContext } from '../../provider/ThemeProvider';
import { EditProfileScreenNavigationProp } from '../../types';

const EditProfileScreen = ({
  navigation,
}: {
  navigation: ScreenNavigationProp;
}) => {
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
