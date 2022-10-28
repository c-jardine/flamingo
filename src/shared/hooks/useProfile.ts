import camelcaseKeys from 'camelcase-keys';
import React from 'react';
import { supabase } from '../../supabase';
import { ProfileProps } from '../types';

const useProfile = (): [loading: boolean, profile: ProfileProps] => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [profile, setProfile] = React.useState<ProfileProps>(
    {} as ProfileProps
  );

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      const userId = user?.id;

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      setProfile(camelcaseKeys(profileData));
    })();
    setLoading(false);
  }, [profile]);

  return [loading, profile];
};

export default useProfile;
