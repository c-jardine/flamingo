import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import Header from '../../components/core/Header';
import ProfileCard from '../../components/core/ProfileCard';
import { useAllUsers } from '../../hooks/useAllUsers';
import { Color } from '../../styles/Color';
import { MainTabsParamList } from '../../types';

/**
 * Shows a list of nearby users.
 */
export const NearbyUsers = ({
  navigation,
}: NativeStackScreenProps<MainTabsParamList, 'NearbyUsers'>) => {
  const [users, isRefreshing, refresh] = useAllUsers();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.base,
        paddingTop: 64,
      }}
    >
      <Header>
        <Header.Title>Nearby users</Header.Title>
      </Header>
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
          }
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingVertical: 16,
          }}
        >
          {users &&
            users.map((user, index) => {
              return (
                <ProfileCard key={index} data={user} navigation={navigation} />
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default NearbyUsers;
