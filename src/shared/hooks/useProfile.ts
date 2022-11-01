import camelcaseKeys from 'camelcase-keys';
import React from 'react';
import { AuthContext } from '../../providers';
import { supabase } from '../../supabase';
import { ProfileProps } from '../types';

const useProfile = (): [loading: boolean, profile: ProfileProps] => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [profile, setProfile] = React.useState<ProfileProps>(
    {} as ProfileProps
  );
  const { session } = React.useContext(AuthContext);
  const id = session?.user.id;

  React.useEffect(() => {
    const ac = new AbortController();
    if (id !== undefined) {
      setLoading(true);
      (async () => {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .abortSignal(ac.signal)
          .single();

        setProfile(camelcaseKeys(profileData));
        console.log(profileData);
      })();
      setLoading(false);
    }

    return () => {
      ac.abort();
    };
  }, []);

  return [loading, profile];
};

export default useProfile;
