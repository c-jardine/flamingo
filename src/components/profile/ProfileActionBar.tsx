import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { AuthContext } from '../../provider/AuthProvider';
import { PhotoAlbumScreenNavigationProp } from '../../types/navigation/mainStack/photoAlbumScreen';
import IconButton from '../core/IconButton';
import { supabase } from '../../initSupabase';
import { Color } from '../../styles/Color';
import { ProfileProps } from '../../types';

const ProfileActionBar = ({ profile }: { profile: ProfileProps }) => {
  const { session } = React.useContext(AuthContext);
  const navigation = useNavigation<PhotoAlbumScreenNavigationProp>();
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false);
  const [isMutual, setIsMutual] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => setIsFavorite(await checkIsFavoriteStatus()))();
  }, [profile]);

  const checkIsFavoriteStatus = async () => {
    const { data, error } = await supabase
      .from('user_favorites_lists')
      .select(`"user"!inner (id), favorite_user!inner (id), is_mutual`)
      .eq('"user".id', session?.user?.id)
      .eq('favorite_user.id', profile?.id as string);

    if (!error) {
      if (data?.length > 0) {
        if (data[0].is_mutual) {
          setIsMutual(true);
        }
        return true;
      } else {
        return false;
      }
    }
    setIsMutual(false);
    return false;
  };

  const handleFavorite = async () => {
    const isisFavorite = await checkIsFavoriteStatus();
    if (!isisFavorite) {
      const { data, error } = await supabase.rpc('user_add_user_to_favorites', {
        user_id: session?.user?.id,
        favorite_user_id: profile?.id,
      });
      if (!error) {
        setIsFavorite(true);
      }
    } else {
      const { data, error } = await supabase.rpc(
        'user_remove_user_from_favorites',
        {
          user_id: session?.user?.id,
          favorite_user_id: profile?.id,
        }
      );
      if (!error) {
        setIsFavorite(false);
      }
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: -28,
        paddingHorizontal: 16,
      }}
    >
      <IconButton
        name='folder-image'
        onPress={() =>
          navigation.navigate('PhotoAlbum', { id: profile?.id as string })
        }
      />
      {profile?.id !== session?.user?.id && (
        <>
          <IconButton name='message-text' />
          <IconButton
            name={isFavorite ? 'heart' : 'heart-outline'}
            color={
              isFavorite
                ? isMutual
                  ? Color.warning
                  : Color.error
                : Color.text.primary
            }
            onPress={handleFavorite}
          />
        </>
      )}
      {/* <IconButton name='dots-horizontal' /> */}
    </View>
  );
};

export default ProfileActionBar;
