import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';
import { ProfileProps } from '../../types/profile';
import Photo from '../common/Photo/Photo';

const ProfileCard = ({
  navigation,
  data,
}: {
  navigation: any;
  data: ProfileProps;
}) => {
  const { theme } = React.useContext(ThemeContext);

  const viewProfile = () => {
    navigation.navigate('Profile', { id: data.id });
  };

  return (
    <TouchableOpacity
      style={{ width: '50%', padding: theme.spacing.sm }}
      onPress={viewProfile}
    >
      <View
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: theme.colors.text['50'],
        }}
      >
        <View
          style={{
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            shadowColor: theme.colors.black,
            shadowOpacity: 1,
          }}
        >
          <Photo
            path={data.avatarSrc as string}
            imgStyle={{ width: '100%', aspectRatio: 0.75 }}
          />
        </View>

        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.85)',
            width: '100%',
            position: 'absolute',
            bottom: 0,
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: 12,
          }}
        >
          <Text style={[{ color: theme.colors.text['800'] }]}>
            {data.firstName} {data.lastName}
          </Text>
          <Text style={[{ color: theme.colors.text['400'] }]}>
            {data.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;
