import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View } from 'react-native';

import Header from '../../components/core/Header';
import MenuContainer from '../../components/core/MenuContainer';
import MenuItem from '../../components/core/MenuItem';
import SignOutButton from '../../components/utils/SignOutButton';

import { Color } from '../../styles/Color';

import SettingsProfileCard from '../../components/core/SettingsProfileCard';
import { ProfileScreenNavigationProp } from '../../types';

const Settings = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <View
      style={{
        paddingTop: 64,
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: Color.base,
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
          </MenuContainer>
        </ScrollView>
        <SignOutButton />
      </View>
    </View>
  );
};

export default Settings;
