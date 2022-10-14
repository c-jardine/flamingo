import { Session } from '@supabase/supabase-js';
import React from 'react';
import { supabase } from '../initSupabase';
import useLocation from '../hooks/useLocation';
type ContextProps = {
  user: null | boolean;
  session: Session | null;
};

const AuthContext = React.createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
  // user null = loading
  const [user, setUser] = React.useState<null | boolean>(null);
  const [session, setSession] = React.useState<Session | null>(null);
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
        } else if (event === 'SIGNED_IN') {
        }
      }
    );
    return () => {
      authListener!.unsubscribe();
    };
  }, [user]);

  React.useEffect(() => {
    console.log(location);
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
