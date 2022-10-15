import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import TabBarIcon from '../components/utils/TabBarIcon';
import NearbyUsers from '../screens/main/NearbyUsers';
import { MainTabsParamList } from '../types';
import Settings from '../screens/main/Settings';
import Community from '../screens/main/Community';
import { ThemeContext } from '../provider/ThemeProvider';

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
