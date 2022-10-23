import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabsParams } from '../../../navigation/MainTabs/MainTabs.types';

export type NearbyUsersScreenProps = NativeStackScreenProps<
  MainTabsParams,
  'NearbyUsers',
  'MainTabs'
>;

export type NearbyUsersScreenRouteProp = NearbyUsersScreenProps['route'];
export type NearbyUsersScreenNavigationProp =
  NearbyUsersScreenProps['navigation'];
