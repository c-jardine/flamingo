import camelcaseKeys from 'camelcase-keys';
import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { Header } from '../../../components/common';
import ProfileCard from '../../../components/profile/ProfileCard/ProfileCard';
import { ThemeContext } from '../../../providers';
import { useAllUsers } from '../../../shared/hooks';
import { NearbyUsersScreenNavigationProp } from './NearbyUsersScreen.types';

/**
 * Shows a list of nearby users.
 */
export const NearbyUsersScreen = (props: {
  navigation: NearbyUsersScreenNavigationProp;
}) => {
  const { theme } = React.useContext(ThemeContext);
  const [users, isRefreshing, refresh] = useAllUsers();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
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
                <ProfileCard
                  key={index}
                  data={camelcaseKeys(user)}
                  navigation={props.navigation}
                />
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default NearbyUsersScreen;
