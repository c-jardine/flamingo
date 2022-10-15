import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import AlbumViewer from '../../components/core/AlbumViewer';
import Photo from '../../components/core/Photo';
import ProfileActionBar from '../../components/profile/ProfileActionBar';
import ProfileDetailsCard from '../../components/profile/ProfileDetailsCard';
import { useDisclosure } from '../../hooks/useDisclosure';
import { supabase } from '../../initSupabase';
import { ThemeContext } from '../../provider/ThemeProvider';
import { ProfileScreenRouteProp } from '../../types';
import { ProfileProps } from '../../types/core/profileProps';

const Profile = ({ route }: { route: ProfileScreenRouteProp }) => {
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
        initialPhoto={profile?.avatar_src}
      />

      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={{ width: '100%', aspectRatio: 0.75 }}
      >
        <Photo
          path={profile?.avatar_src as string}
          imgStyle={{ width: '100%', height: '100%' }}
        />
      </TouchableOpacity>
      <ProfileActionBar profile={profile as ProfileProps} />
      <ProfileDetailsCard profile={profile} />
    </View>
  );
};

export default Profile;
