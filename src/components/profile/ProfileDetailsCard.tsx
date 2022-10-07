import React from 'react';
import { AppState, Text, View } from 'react-native';
import { TYPOGRAPHY } from '../../styles/typography';
import OnlineIndicator from '../core/OnlineIndicator';
import TextWithIcon from '../core/TextWithIcon';

const ProfileDetailsCard = ({ profile }) => {
  return (
    <View>
      <OnlineIndicator isOnline={profile?.is_online} lastOnline={profile?.last_online} />
      <Text style={TYPOGRAPHY.h1}>
        {profile?.first_name} {profile?.last_name}
      </Text>
      <TextWithIcon icon='map-marker'>{profile?.location}</TextWithIcon>
    </View>
  );
};

export default ProfileDetailsCard;
