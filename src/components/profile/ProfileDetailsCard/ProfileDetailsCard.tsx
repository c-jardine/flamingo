import React from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../../../providers';
import { OnlineIndicator, Text } from '../../common';

const ProfileDetailsCard = (props: ProfileProps) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <View>
      <OnlineIndicator
        isOnline={props.profile?.is_online}
        lastOnline={props.profile?.last_online}
      />
      <Text leftIcon={{ name: 'map-marker' }}>
        {props.profile?.first_name} {props.profile?.last_name}
      </Text>
    </View>
  );
};

export default ProfileDetailsCard;
