import React from 'react';
import { View } from 'react-native';
import IconButton from '../core/IconButton';
import { Color, withOpacity } from '../../styles/Color';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../initSupabase';

const ProfileActionBar = ({ id }: { id: string }) => {
  const navigation = useNavigation();
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
      {id !== supabase.auth.user()?.id && (
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
