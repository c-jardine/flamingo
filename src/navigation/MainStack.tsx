import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import EditProfile from '../screens/main/EditProfile';
import Profile from '../screens/main/Profile';
import MainTabs from './MainTabs';

import { MainStackParamList } from '../types';
import PhotoAlbum from '../screens/main/PhotoAlbum';
import AlbumViewer from '../components/core/AlbumViewer';

const MainStack = createNativeStackNavigator<MainStackParamList>();

const Main = () => {
  return (
    <MainStack.Navigator
      id='MainStack'
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name='MainTabs' component={MainTabs} />
      <MainStack.Screen name='EditProfile' component={EditProfile} />
      <MainStack.Screen name='Profile' component={Profile} />
      <MainStack.Screen name='PhotoAlbum' component={PhotoAlbum} />
      <MainStack.Screen name='AlbumViewer' component={AlbumViewer} />
    </MainStack.Navigator>
  );
};

export default Main;
