import { Session } from '@supabase/supabase-js';
import React from 'react';
import useLocation from '../hooks/useLocation';
import { supabase } from '../initSupabase';
import { ProfileProps } from '../types/core/profileProps';
type ContextProps = {
  user: null | boolean;
  session: Session | null;
  profile: ProfileProps | null;
};

const AuthContext = React.createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
  // user null = loading
  const [user, setUser] = React.useState<null | boolean>(null);
  const [session, setSession] = React.useState<Session | null>(null);
  const [profile, setProfile] = React.useState<ProfileProps | null>(null);
  const [location, error] = useLocation();

  React.useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session ? true : false);
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

          console.log('USER', user);
          console.log('PROFILE', profile);

          if (data) {
            setProfile(data);
          } else {
            setProfile(null);
          }
        }
      }
    );
    return () => {
      authListener!.unsubscribe();
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
