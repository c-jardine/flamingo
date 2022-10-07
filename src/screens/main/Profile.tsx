import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import AlbumViewer from '../../components/core/AlbumViewer';
import Photo from '../../components/core/Photo';
import ProfileActionBar from '../../components/profile/ProfileActionBar';
import ProfileDetailsCard from '../../components/profile/ProfileDetailsCard';
import { useDisclosure } from '../../hooks/useDisclosure';
import { supabase } from '../../initSupabase';
import { Color } from '../../styles/Color';
import { ProfileScreenRouteProp } from '../../types';
import { ProfileProps } from '../../types/core/profileProps';
import { PhotoAlbumScreenNavigationProp } from '../../types/navigation/mainStack/photoAlbumScreen';

const Profile = ({ route }: { route: ProfileScreenRouteProp }) => {
  const [isOpen, setIsOpen] = useDisclosure();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [profile, setProfile] = React.useState<ProfileProps>();



  const modalizeRef = React.useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

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
    <View style={{ flex: 1, backgroundColor: Color.base }}>
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
      <ProfileActionBar id={profile?.id} />
      <ProfileDetailsCard profile={profile} />
    </View>
  );
};

export default Profile;
