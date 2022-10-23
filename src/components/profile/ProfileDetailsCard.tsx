import React from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';
import { OnlineIndicator, Text } from '../common';

const ProfileDetailsCard = ({ profile }) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <View>
      <OnlineIndicator
        isOnline={profile?.is_online}
        lastOnline={profile?.last_online}
      />
      <Text leftIcon={{ name: 'map-marker' }}>
        {profile?.first_name} {profile?.last_name}
      </Text>
    </View>
  );
};

export default ProfileDetailsCard;
