import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AlbumViewer, Photo } from '../../../components/common';
import {
  ProfileActionBar,
  ProfileDetailsCard,
} from '../../../components/profile';
import { ThemeContext } from '../../../providers';
import { useDisclosure } from '../../../shared/hooks';
import { ProfileProps } from '../../../shared/types';
import { supabase } from '../../../supabase';
import { ProfileScreenRouteProp } from './ProfileScreen.types';

const ProfileScreen = ({ route }: { route: ProfileScreenRouteProp }) => {
  const { theme } = React.useContext(ThemeContext);

  const [isOpen, setIsOpen] = useDisclosure();
  const [profile, setProfile] = React.useState<ProfileProps>();

  const getProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', route.params.id)
      .single();

    setProfile(data);
  };

  React.useEffect(() => {
    (async () => {
      await getProfile();
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AlbumViewer
        albumId={profile?.id as string}
        isVisible={isOpen}
        setIsVisible={setIsOpen}
        initialPhoto={profile?.avatarSrc}
      />

      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={{ width: '100%', aspectRatio: 0.75 }}
      >
        <Photo
          path={profile?.avatarSrc as string}
          imgStyle={{ width: '100%', height: '100%' }}
        />
      </TouchableOpacity>
      <ProfileActionBar profile={profile as ProfileProps} />
      <ProfileDetailsCard profile={profile} />
    </View>
  );
};

export default ProfileScreen;
