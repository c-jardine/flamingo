import { Session } from '@supabase/supabase-js';
import { ProfileProps } from '../../shared/types';

type AuthContextProps = {
  user: null | boolean;
  session: Session | null;
  profile: ProfileProps | null;
  setProfile: (profile: ProfileProps) => void;
};

export default AuthContextProps;
