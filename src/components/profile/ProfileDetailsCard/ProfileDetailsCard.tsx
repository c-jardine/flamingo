import React from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../../../providers';
import { OnlineIndicator, Text } from '../../common';
import ProfileDetailsCardProps from './ProfileDetailsCard.types';

const ProfileDetailsCard = (props: ProfileDetailsCardProps) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <View>
      <OnlineIndicator
        isOnline={props.profile?.isOnline}
        lastOnline={props.profile?.lastOnline}
      />
      <Text leftIcon={{ name: 'map-marker' }}>
        {props.profile?.firstName} {props.profile?.lastName}
      </Text>
    </View>
  );
};

export default ProfileDetailsCard;
