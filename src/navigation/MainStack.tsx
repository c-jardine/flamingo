import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import EditProfile from '../screens/main/EditProfile';
import Profile from '../screens/main/Profile';
import MainTabs from './MainTabs';

import AlbumViewer from '../components/core/AlbumViewer';
import { AuthContext } from '../provider/AuthProvider';
import PhotoAlbum from '../screens/main/PhotoAlbum';
import NewUserSetup from '../screens/newUser/NewUserSetup';
import { MainStackParamList } from '../types';

const MainStack = createNativeStackNavigator<MainStackParamList>();

const Main = () => {
  const { user, profile } = React.useContext(AuthContext);

  return (
    <MainStack.Navigator
      id='MainStack'
      screenOptions={{
        headerShown: false,
      }}
    >
      {user && !profile && (
        <MainStack.Screen name='NewUserSetup' component={NewUserSetup} />
      )}
      <MainStack.Screen name='MainTabs' component={MainTabs} />
      <MainStack.Screen name='EditProfile' component={EditProfile} />
      <MainStack.Screen name='Profile' component={Profile} />
      <MainStack.Screen name='PhotoAlbum' component={PhotoAlbum} />
      <MainStack.Screen name='AlbumViewer' component={AlbumViewer} />
    </MainStack.Navigator>
  );
};

export default Main;
