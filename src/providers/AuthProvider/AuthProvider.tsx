import { Session } from '@supabase/supabase-js';
import React from 'react';
import { ProfileProps } from '../../shared/types';
import { supabase } from '../../supabase';
import AuthContext from './AuthContext';
import AuthProviderProps from './AuthProvider.types';
import camelcaseKeys from 'camelcase-keys';

const AuthProvider = (props: AuthProviderProps) => {
  const [session, setSession] = React.useState<Session | null>(null);
  const [profile, setProfile] = React.useState<ProfileProps | null>(null);

  const _getProfile = async (id: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (!error) {
      setProfile(camelcaseKeys(data));
    }
  };

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  React.useEffect(() => {
    if (session) {
      (async () => {
        _getProfile(session?.user.id);
      })();
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        session,
        profile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
