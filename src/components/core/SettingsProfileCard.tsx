import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuthenticatedUserProfile } from '../../hooks/useAuthenticatedUserProfile';
import { useDisclosure } from '../../hooks/useDisclosure';
import { Color } from '../../styles/Color';
import {
  EditProfileScreenNavigationProp,
  PhotoAlbumScreenNavigationProp,
} from '../../types';
import MenuItem from './MenuItem';
import RNModal from './Modal';
import Photo from './Photo';

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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PhotoAlbum', { id: profile?.id as string })
        }
      >
        <Photo
          path={profile.avatar_src as string}
          imgStyle={{
            width: 100,
            aspectRatio: 1,
            borderRadius: 50,
          }}
        />
      </TouchableOpacity>
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
            onPress={() => navigation.navigate('EditProfile')}
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
    </View>
  );
};

export default SettingsProfileCard;
