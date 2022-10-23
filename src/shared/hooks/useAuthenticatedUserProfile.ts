import { PostgrestError } from '@supabase/supabase-js';
import React from 'react';
import { AuthContext } from '../../providers';
import { supabase } from '../../supabase';
import { ProfileProps } from '../types';

/**
 * Get the authenticated user's profile.
 * @returns Where applicable: the loading state, error messages, and the profile.
 */
export const useAuthenticatedUserProfile = (): {
  loading: boolean;
  error: PostgrestError;
  profile: ProfileProps;
} => {
  const { session } = React.useContext(AuthContext);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<PostgrestError>({
    code: '',
    details: '',
    hint: '',
    message: '',
  });
  const [profile, setProfile] = React.useState<ProfileProps>({
    firstName: '',
    lastName: '',
    dob: new Date(),
    gender: { gender: '', identities: [] },
    location: '',
  });

  /**
   * Fetch the authenticated user's profile.
   */
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session?.user?.id)
          .maybeSingle();

        if (!data && error) {
          setError(error);
        }
        if (data && !error) {
          setProfile(data);
        }
      } catch (error) {
        throw new Error();
      }
    })();
    setLoading(false);
  }, []);

  return { loading, error, profile };
};
