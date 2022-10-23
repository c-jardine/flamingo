import * as ImagePicker from 'expo-image-picker';
import React from 'react';

/**
 * Hook to manage media uploads using the media library.
 * @returns
 */
// TODO: Reimplement the whole thing
export const useMediaLibrary = () => {
  const [canceled, setCanceled] = React.useState<boolean>(false);

  const mediaLibraryResult =
    async (): Promise<ImagePicker.ImagePickerResult> => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      const result: ImagePicker.ImagePickerResult =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });

      if (!result.cancelled) {
        return result;
      } else {
        setCanceled(true);
      }

      return result;
    };

  return [mediaLibraryResult, canceled] as const;
};
