import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Color } from '../../styles/Color';
import { TYPOGRAPHY } from '../../styles/typography';
import { ProfileProps } from '../../types';
import Photo from './Photo';

const ProfileCard = ({
  navigation,
  data,
}: {
  navigation: any;
  data: ProfileProps;
}) => {
  // const [action, loading, error] = usePhoto(data.avatar_src);
  const viewProfile = () => {
    navigation.navigate('Profile', { id: data.id });
  };

  return (
    <TouchableOpacity
      style={{ width: '50%', padding: 8 }}
      onPress={viewProfile}
    >
      <View
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: Color.accent[50],
        }}
      >
        <View
          style={{
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            shadowColor: Color.black,
            shadowOpacity: 1,
          }}
        >
          <Photo
            path={data.avatar_src}
            imgStyle={{ width: '100%', aspectRatio: 0.75 }}
          />
        </View>

        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.85)',
            width: '100%',
            position: 'absolute',
            bottom: 0,
            paddingHorizontal: 8,
            paddingVertical: 12,
          }}
        >
          <Text style={[TYPOGRAPHY.body, { color: Color.accent[600] }]}>
            {data.first_name} {data.last_name}
          </Text>
          <Text style={[TYPOGRAPHY.body, { color: Color.accent[300] }]}>
            {data.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;
