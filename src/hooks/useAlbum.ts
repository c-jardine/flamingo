import React from 'react';
import { supabase } from '../initSupabase';

/**
 * Hook to manage the state of photos contained within a user's photo album.
 *
 * @param id The id of the user whose photo album will be loaded.
 * This is the name of their folder in the database.
 * @returns The photo album and loading state.
 */
// TODO: Implement pagination
// TODO: Properly type the album
export const useAlbum = (id: string): [album: any, loading: boolean] => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [album, setAlbum] = React.useState<any>();

  /**
   * Fetch photos on initial load.
   */
  React.useEffect(() => {
    (async () => {
      getAlbumContents();
    })();
  }, []);

  /**
   * Handler to fetch photos in the user's album.
   */
  const getAlbumContents = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from('albums')
      .list(id, { limit: 10 });
    if (!error && data) {
      setAlbum(data);
    }
    setLoading(false);
  };

  return [album, loading];
};
