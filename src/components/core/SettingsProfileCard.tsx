import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Photo from './Photo';
import { supabase } from '../../initSupabase';
import { useAuthenticatedUserProfile } from '../../hooks/useAuthenticatedUserProfile';
import { Color } from '../../styles/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  EditProfileScreenNavigationProp,
  PhotoAlbumScreenNavigationProp,
} from '../../types';
import { useDisclosure } from '../../hooks/useDisclosure';
import RNModal from './Modal';
import MenuItem from './MenuItem';

const SettingsProfileCard = () => {
  const [isOpen, setIsOpen] = useDisclosure();
  const { loading, error, profile } = useAuthenticatedUserProfile();

  const navigation = useNavigation<
    EditProfileScreenNavigationProp | PhotoAlbumScreenNavigationProp
  >();

  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 32,
        alignItems: 'center',
      }}
    >
      <View style={{}}>
        <Photo
          path={profile.avatar_src}
          imgStyle={{
            width: 100,
            aspectRatio: 1,
            borderRadius: 50,
          }}
        />
      </View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={{ color: Color.accent[700], fontSize: 22 }}>
          {profile.first_name} {profile.last_name}
        </Text>
        <Text style={{ color: Color.accent[400], fontSize: 14, marginTop: 2 }}>
          {profile.location}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: Color.primary,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 4,
              paddingVertical: 8,
              borderRadius: 8,
            }}
            onPress={() => setIsOpen(true)}
          >
            <Text style={{ textTransform: 'uppercase', fontWeight: '500' }}>
              Edit profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 4,
            }}
            onPress={() => {
              navigation.navigate('Profile', { id: profile?.id });
            }}
          >
            <Text style={{ textTransform: 'uppercase', color: Color.primary }}>
              View profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ position: 'absolute' }}>
        <RNModal isVisible={isOpen} setIsVisible={setIsOpen}>
          <Text
            style={{ color: Color.text.primary, fontSize: 18, marginTop: 16 }}
          >
            Profile options
          </Text>
          <MenuItem
            onPress={() => {
              setIsOpen(false);
              navigation.navigate('EditProfile');
            }}
          >
            Edit your profile
          </MenuItem>
          <MenuItem
            onPress={() => {
              setIsOpen(false);
              navigation.navigate('PhotoAlbum', { id: profile?.id });
            }}
          >
            Edit photo album
          </MenuItem>
        </RNModal>
      </View>
    </View>
  );
};

export default SettingsProfileCard;
