import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { AuthContext, ThemeContext } from '../../../providers';
import { PhotoAlbumScreenNavigationProp } from '../../../screens/main';
import { supabase } from '../../../supabase';
import { IconButton } from '../../common';
import ProfileActionBarProps from './ProfileActionBar.types';
import camelcaseKeys from 'camelcase-keys';

const ProfileActionBar = (props: ProfileActionBarProps) => {
  const { theme } = React.useContext(ThemeContext);

  const { session } = React.useContext(AuthContext);
  const navigation = useNavigation<PhotoAlbumScreenNavigationProp>();
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false);
  const [isMutual, setIsMutual] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => setIsFavorite(await checkIsFavoriteStatus()))();
  }, [props]);

  const checkIsFavoriteStatus = async () => {
    const { data, error } = await supabase
      .from('user_favorites_lists')
      .select(`"user"!inner (id), favorite_user!inner (id), is_mutual`)
      .eq('"user".id', session?.user?.id)
      .eq('favorite_user.id', props?.id as string);

    if (!error) {
      if (data?.length > 0) {
        if (camelcaseKeys(data[0]).isMutual) {
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
        favorite_user_id: props.id,
      });
      if (!error) {
        setIsFavorite(true);
      }
    } else {
      const { data, error } = await supabase.rpc(
        'user_remove_user_from_favorites',
        {
          user_id: session?.user?.id,
          favorite_user_id: props.id,
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
        iconProps={{
          name: 'folder-image',
          onPress: () =>
            navigation.navigate('PhotoAlbum', { id: props.id as string }),
        }}
      />
      {props.id !== session?.user?.id && (
        <>
          <IconButton iconProps={{ name: 'message-text' }} />
          <IconButton
            iconProps={{
              name: isFavorite ? 'heart' : 'heart-outline',
              color: isFavorite
                ? isMutual
                  ? theme.colors.warning
                  : theme.colors.error
                : theme.colors.text['800'],
              onPress: handleFavorite,
            }}
          />
        </>
      )}
      {/* <IconButton name='dots-horizontal' /> */}
    </View>
  );
};

export default ProfileActionBar;
