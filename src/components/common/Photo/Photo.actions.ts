import { supabase } from '../../../initSupabase';

export const getPhoto = (path: string) => {
  const { data, error } = supabase.storage.from('albums').getPublicUrl(path);

  if (!error) {
    return data;
  } else {
    throw new Error(error);
  }
};
