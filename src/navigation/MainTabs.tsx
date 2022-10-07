import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import TabBarIcon from '../components/utils/TabBarIcon';
import NearbyUsers from '../screens/main/NearbyUsers';

import { Color } from '../styles/Color';
import { MainTabsParamList } from '../types';
import Settings from '../screens/main/Settings';

const Tabs = createBottomTabNavigator<MainTabsParamList>();

const MainTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Color.base,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name='NearbyUsers'
        component={NearbyUsers}
        options={{
          // tabBarLabel: ({ focused }) => (
          //   <TabBarText focused={focused} title='NearbyUsers' />
          // ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={focused ? 'md-home' : 'md-home-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='Settings'
        component={Settings}
        options={{
          // tabBarLabel: ({ focused }) => (
          //   <TabBarText focused={focused} title='About' />
          // ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={focused ? 'md-settings' : 'md-settings-outline'}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default MainTabs;
