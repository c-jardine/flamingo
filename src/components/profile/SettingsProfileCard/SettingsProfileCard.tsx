import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../../providers';
import {
  EditProfileScreenNavigationProp,
  PhotoAlbumScreenNavigationProp,
} from '../../../screens/main';
import useProfile from '../../../shared/hooks/useProfile';
import { supabase } from '../../../supabase';
import { Photo } from '../../common';

const SettingsProfileCard = () => {
  const { theme } = React.useContext(ThemeContext);
  const [loading, profile] = useProfile();
  const [avatarSrc, setAvatarSrc] = React.useState<string>('');

  const navigation = useNavigation<
    EditProfileScreenNavigationProp | PhotoAlbumScreenNavigationProp
  >();

  React.useEffect(() => {
    const avatarSrc = supabase.storage
      .from('albums')
      .getPublicUrl(profile?.avatarSrc as string).data.publicUrl as string;
    console.log(avatarSrc);
    setAvatarSrc(avatarSrc);
  }, [profile]);

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
          path={avatarSrc}
          imgStyle={{
            width: 100,
            aspectRatio: 1,
            borderRadius: 50,
          }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={{ color: theme.colors.text['700'], fontSize: 22 }}>
          {profile?.firstName} {profile?.lastName}
        </Text>
        <Text
          style={{
            color: theme.colors.text['400'],
            fontSize: 14,
            marginTop: 2,
          }}
        >
          {profile?.location}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: theme.colors.primary,
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
              navigation.navigate('Profile', { id: profile?.id as string });
            }}
          >
            <Text
              style={{
                textTransform: 'uppercase',
                color: theme.colors.primary,
              }}
            >
              View profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SettingsProfileCard;
