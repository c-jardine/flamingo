import React from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';
import OnlineIndicator from '../core/OnlineIndicator';
import TextWithIcon from '../core/TextWithIcon';

const ProfileDetailsCard = ({ profile }) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <View>
      <OnlineIndicator
        isOnline={profile?.is_online}
        lastOnline={profile?.last_online}
      />
      <Text
        style={{ ...theme.textVariants.title, color: theme.colors.text['800'] }}
      >
        {profile?.first_name} {profile?.last_name}
      </Text>
      <TextWithIcon icon='map-marker'>{profile?.location}</TextWithIcon>
    </View>
  );
};

export default ProfileDetailsCard;
