import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainTabsParamList = {
  NearbyUsers: undefined;
  Settings: undefined;
  PhotoAlbum: undefined;
};

export type SettingsTabProps = NativeStackScreenProps<
  MainTabsParamList,
  'Settings',
  'MainStack'
>;

export type SettingsTabRouteProps = SettingsTabProps['route'];
export type SettingsTabNavigationProps = SettingsTabProps['navigation'];
