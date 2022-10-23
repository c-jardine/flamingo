import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TabBarIcon } from '../components/common';
import { ThemeContext } from '../provider/ThemeProvider';
import Community from '../screens/main/Community';
import NearbyUsers from '../screens/main/NearbyUsers';
import Settings from '../screens/main/Settings';
import { MainTabsParamList } from '../types';

const Tabs = createBottomTabNavigator<MainTabsParamList>();

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
        component={NearbyUsers}
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
        component={Community}
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
        component={Settings}
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
