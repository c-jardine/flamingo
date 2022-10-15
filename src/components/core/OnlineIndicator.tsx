import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const OnlineIndicator = ({
  isOnline,
  lastOnline,
}: {
  isOnline: boolean;
  lastOnline: Date;
}) => {
  const { theme } = React.useContext(ThemeContext);

  const date = new Date(lastOnline + 'Z');
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={{
          width: 12,
          height: 12,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 6,
          borderWidth: 1,
          borderColor: isOnline ? theme.colors.success : theme.colors.error,
        }}
      >
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: isOnline
              ? theme.colors.success
              : theme.colors.error,
          }}
        />
      </View>
      {lastOnline && (
        <Text
          style={{
            color: theme.colors.text['500'],
            marginLeft: 8,
          }}
        >
          {isOnline
            ? 'online now'
            : `last seen ${formatDistanceToNow(date)} ago`}
        </Text>
      )}
    </View>
  );
};

export default OnlineIndicator;
