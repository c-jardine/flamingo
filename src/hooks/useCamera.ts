import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { supabase } from '../initSupabase';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { AuthContext } from '../provider/AuthProvider';

/**
 * Hook to manage media uploads using the camera.
 * @returns The result from the camera and the loading state.
 */
export const useCamera = (): [
  cameraResult: () => Promise<void>,
  loading: boolean
] => {
  const { session } = React.useContext(AuthContext);

  const [loading, setLoading] = React.useState<boolean>(false);

  /**
   * Attempts to take a photo and upload it to the database.
   * @returns The result from the camera.
   */
  const cameraResult = async () => {
    // Check for camera permissions.
    await ImagePicker.requestCameraPermissionsAsync();

    // Open the camera.
    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 1,
      });

    if (!result.cancelled) {
      setLoading(true);

      const manipulatedResult = await manipulateAsync(
        result.uri,
        [{ resize: { width: 1200 } }],
        { compress: 0.5, format: SaveFormat.JPEG }
      );

      // Build the file/blob needed to upload via supabase.
      const filename = manipulatedResult.uri.replace(/^.*[\\\/]/, '');
      const formData = new FormData();
      //TODO: Fix this to remove type error
      const blob = {
        uri: manipulatedResult?.uri,
        name: filename,
        type: 'image/jpeg',
      };
      formData.append('files', blob);

      // This will be the storage location in supabase.
      const supabaseUrl = `${session?.user?.id}/${filename}`;

      // Upload the photo.
      // TODO: Should most likely extract this process into its own hook
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('albums')
        .upload(supabaseUrl, formData, {
          cacheControl: '3600',
          upsert: false,
        });

      // Change user's avatar_src to point to the new photo.
      // TODO: Move this into a more appropriate place.
      await supabase
        .from('profiles')
        .update({ avatar_src: supabaseUrl })
        .eq('id', session?.user?.id);
    }
    setLoading(false);
  };

  return [cameraResult, loading];
};
