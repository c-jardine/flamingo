import React from 'react';
import { ScrollView, View } from 'react-native';
import IDScanner from '../../components/auth/IDScanner';
import Header from '../../components/common/Header/Header';
import MenuContainer from '../../components/core/MenuContainer';
import MenuItem from '../../components/core/MenuItem';
import SettingsProfileCard from '../../components/core/SettingsProfileCard';
import SignOutButton from '../../components/utils/SignOutButton';
import { ThemeContext } from '../../provider/ThemeProvider';

const Settings = () => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View
      style={{
        paddingTop: 64,
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.background,
      }}
    >
      <Header>
        <Header.Title>Settings</Header.Title>
      </Header>
      <View style={{ flex: 1 }}>
        {/* <MenuItem icon='star-four-points' iconStyle={{ color: Color.warning }}>
          Upgrade to premium
        </MenuItem> */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <SettingsProfileCard />
          <MenuContainer>
            <MenuContainer.Title icon='account-outline'>
              Account
            </MenuContainer.Title>
          </MenuContainer>
          <MenuItem>Change password</MenuItem>
          <MenuItem>Privacy settings</MenuItem>

          <MenuContainer>
            <MenuContainer.Title icon='information-outline'>
              Info
            </MenuContainer.Title>
            <MenuItem>Help</MenuItem>
            <MenuItem>About</MenuItem>
            <IDScanner />
          </MenuContainer>
        </ScrollView>
        <SignOutButton />
      </View>
    </View>
  );
};

export default Settings;
