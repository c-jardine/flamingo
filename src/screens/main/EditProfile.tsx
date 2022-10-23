import React from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/common/Header/Header';
import ProfileForm from '../../components/form/ProfileForm';
import BackHeader from '../../components/utils/BackHeader';
import { ThemeContext } from '../../provider/ThemeProvider';
import { EditProfileScreenNavigationProp } from '../../types';

const EditProfile = ({
  navigation,
}: {
  navigation: EditProfileScreenNavigationProp;
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
