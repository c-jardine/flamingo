import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthContext } from '../../providers';
import {
  EditProfileScreen,
  PhotoAlbumScreen,
  ProfileScreen,
} from '../../screens/main';
import { MainTabs } from '../MainTabs';
import MainStackParams from './MainStack.types';

const Main = createNativeStackNavigator<MainStackParams>();

const MainStack = () => {
  const { user, profile } = React.useContext(AuthContext);

  return (
    <Main.Navigator
      id='Main'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Main.Screen name='MainTabs' component={MainTabs} />
      <Main.Screen name='EditProfile' component={EditProfileScreen} />
      <Main.Screen name='Profile' component={ProfileScreen} />
      <Main.Screen name='PhotoAlbum' component={PhotoAlbumScreen} />
      {/* <Main.Screen name='AlbumViewer' component={AlbumViewer} /> */}
    </Main.Navigator>
  );
};

export default MainStack;
