import { differenceInYears } from 'date-fns';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../../providers';
import { Photo } from '../../common';
import ProfileCardProps from './ProfileCard.types';

const ProfileCard = (props: ProfileCardProps) => {
  const { theme } = React.useContext(ThemeContext);

  const viewProfile = () => {
    props.navigation.navigate('Profile', { id: props.data.id as string });
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
            path={props.data.avatarSrc as string}
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
            {props.data.firstName} {props.data.lastName}
          </Text>
          <Text style={[{ color: theme.colors.text['400'] }]}>
            {differenceInYears(new Date(), new Date(props.data.dob))} years old
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;
