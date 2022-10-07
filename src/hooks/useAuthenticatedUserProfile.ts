import { PostgrestError } from '@supabase/supabase-js';
import React from 'react';
import { supabase } from '../initSupabase';
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
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<PostgrestError>({
    code: '',
    details: '',
    hint: '',
    message: '',
  });
  const [profile, setProfile] = React.useState<ProfileProps>({
    first_name: '',
    last_name: '',
    dob: new Date(),
    gender: '',
    location: '',
  });

  // Get the authenticated user's id.
  const userId = supabase.auth.user()?.id;

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
          .eq('id', userId)
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
