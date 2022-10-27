import { supabase } from '../../../supabase';

export const getPhoto = (path: string) => {
  const { data } = supabase.storage.from('albums').getPublicUrl(path);
  return data.publicUrl;
};
