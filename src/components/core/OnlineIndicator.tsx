import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { Text, View } from 'react-native';
import { Color, withOpacity } from '../../styles/Color';

const OnlineIndicator = ({
  isOnline,
  lastOnline,
}: {
  isOnline: boolean;
  lastOnline: Date;
}) => {
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
          borderColor: isOnline
            ? withOpacity(Color.success, 0.5)
            : withOpacity(Color.error, 0.5),
        }}
      >
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: isOnline ? Color.success : Color.error,
          }}
        />
      </View>
      {lastOnline && (
        <Text
          style={{
            color: Color.accent[500],
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
