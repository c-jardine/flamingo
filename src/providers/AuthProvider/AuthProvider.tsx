import { Session } from '@supabase/supabase-js';
import React from 'react';
import { ProfileProps } from '../../shared/types';
import { supabase } from '../../supabase';
import AuthContext from './AuthContext';
import AuthProviderProps from './AuthProvider.types';
import camelcaseKeys from 'camelcase-keys';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slices/appSlice';
import { Alert } from 'react-native';

const AuthProvider = (props: AuthProviderProps) => {
  const [session, setSession] = React.useState<Session | null>(null);
  const [profile, setProfile] = React.useState<ProfileProps | null>(null);

  const dispatch = useDispatch();

  const _getProfile = async (id: string) => {
    try {
      dispatch(setLoading(true));
      if (!session?.user) throw new Error('Invalid session.');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(
          `first_name, last_name, dob, 
          user_genders (gender),
          user_gender_identities (identity),
          user_pronouns (pronoun),
          user_sexual_orientations (orientation),
          user_personality_types (personality)`
        )
        .eq('id', id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfile(camelcaseKeys(data));
      }
    } catch (error) {
      Alert.alert(error?.message);
    } finally {
      dispatch(setLoading(false));
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
    if (session) _getProfile(session?.user.id);
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
