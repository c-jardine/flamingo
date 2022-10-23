import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TabBarIcon } from '../../components/common';
import { ThemeContext } from '../../providers';
import {
  CommunityScreen,
  NearbyUsersScreen,
  SettingsScreen,
} from '../../screens/mainTabs';
import { MainTabsParams } from './MainTabs.types';

const Tabs = createBottomTabNavigator<MainTabsParams>();

const MainTabs = () => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name='NearbyUsers'
        component={NearbyUsersScreen}
        options={{
          // tabBarLabel: ({ focused }) => (
          //   <TabBarText focused={focused} title='NearbyUsers' />
          // ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={focused ? 'home' : 'home-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='Community'
        component={CommunityScreen}
        options={{
          // tabBarLabel: ({ focused }) => (
          //   <TabBarText focused={focused} title='NearbyUsers' />
          // ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={focused ? 'account-group' : 'account-group-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          // tabBarLabel: ({ focused }) => (
          //   <TabBarText focused={focused} title='Community' />
          // ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={focused ? 'cog' : 'cog-outline'}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default MainTabs;
