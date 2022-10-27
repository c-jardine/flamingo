import React from 'react';
import { AuthContext } from '../../providers';
import { supabase } from '../../supabase';
import { ProfileProps } from '../types';

/**
 * Hook to manage the state of all users on screens such as 'NearbyUsers'.
 *
 * @returns The list of users, refreshing state, and refreshing state handler.
 */
// TODO: Implement pagination
export const useAllUsers = (): [
  users: ProfileProps[],
  isRefreshing: boolean,
  refresh: () => void
] => {
  const { session } = React.useContext(AuthContext);
  const [users, setUsers] = React.useState<ProfileProps[]>([]);
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

  /**
   * Fetch users on initial load.
   */
  React.useEffect(() => {
    (async () => {
      const usersRes = (await refresh()) as ProfileProps[];
      setUsers(usersRes);
    })();
  }, []);

  /**
   * Handler to fetch all users. Also used when refresh is triggered.
   * @returns {ProfileProps[]} profiles The list of profiles loaded from the database.
   */
  const refresh = async (): Promise<ProfileProps[]> => {
    setIsRefreshing(true);

    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', session?.user?.id as string);

    setUsers(profiles);

    if (error) {
      throw new Error();
    }
    setIsRefreshing(false);
    return profiles;
  };

  return [users, isRefreshing, refresh];
};
