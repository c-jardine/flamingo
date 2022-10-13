import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { AuthContext } from '../../provider/AuthProvider';
import { PhotoAlbumScreenNavigationProp } from '../../types/navigation/mainStack/photoAlbumScreen';
import IconButton from '../core/IconButton';

const ProfileActionBar = ({ id }: { id: string }) => {
  const { session } = React.useContext(AuthContext);
  const navigation = useNavigation<PhotoAlbumScreenNavigationProp>();
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
        onPress={() => navigation.navigate('PhotoAlbum', { id })}
      />
      {id === session?.user?.id && (
        <>
          <IconButton name='message-text' />
          <IconButton name='heart-outline' />
        </>
      )}
      {/* <IconButton name='dots-horizontal' /> */}
    </View>
  );
};

export default ProfileActionBar;
