import { Session } from '@supabase/supabase-js';
import React from 'react';
import { ProfileProps } from '../../shared/types';
import { supabase } from '../../supabase';
import AuthContext from './AuthContext';
import AuthProviderProps from './AuthProvider.types';
import camelcaseKeys from 'camelcase-keys';

const AuthProvider = (props: AuthProviderProps) => {
  // user null = loading
  const [user, setUser] = React.useState<null | boolean>(null);
  const [session, setSession] = React.useState<Session | null>(null);
  const [profile, setProfile] = React.useState<ProfileProps | null>(
    {} as ProfileProps
  );

  React.useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session ? true : false);

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log(`Supabase auth event: ${event}`);
          setSession(session);
          setUser(session ? true : false);
          if (event === 'SIGNED_OUT') {
            setProfile(null);
          } else if (event === 'SIGNED_IN') {
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session?.user?.id)
              .single();

            if (data) {
              setProfile(camelcaseKeys(data));
            } else {
              setProfile(null);
            }
          }
        }
      );
      return () => {
        authListener.subscription!.unsubscribe();
      };
    })();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        setProfile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
