import {
  ImageResult,
  manipulateAsync,
  SaveFormat,
} from 'expo-image-manipulator';
import * as Sentry from 'sentry-expo';
import { supabase } from '../../supabase';

export const manipulateImage = async (
  uri: string
): Promise<ImageResult | undefined> => {
  try {
    const manipulatedResult = await manipulateAsync(
      uri,
      [{ resize: { width: 1200 } }],
      { compress: 0.5, format: SaveFormat.JPEG }
    );

    return manipulatedResult;
  } catch (error) {
    Sentry.Native.captureException(error);
  }
};

export const formatImageUri = (userId: string, uri: string): string => {
  const filename = `${userId}/${uri.replace(/^.*[\\\/]/, '')}`;
  return filename;
};

export const generateStorageBlob = (filename: string, uri: string) => {
  const formData = new FormData();
  const blob = {
    uri: uri,
    name: filename,
    type: 'image/jpeg',
  };
  formData.append('files', blob as any);
  return formData;
};

export const prepForStorage = async (userId: string, uri: string) => {
  const manipulatedResult = await manipulateImage(uri);
  const filename = formatImageUri(userId, manipulatedResult?.uri as string);
  const supabaseUrl = `${userId}/${filename}`;
  const blob = generateStorageBlob(filename, manipulatedResult?.uri as string);
  const params = { url: supabaseUrl, blob };
  return params;
};

/**
 * Upload a photo to Supabase storage.
 * @param userId The id belonging to the session user.
 * @param uri The local uri for the image.
 * @returns The supabase url to the image.
 */
export const uploadImage = async (
  userId: string,
  uri: string
): Promise<{ path: string }> => {
  const params = await prepForStorage(userId, uri);
  const { data, error } = await supabase.storage
    .from('albums')
    .upload(params.url, params.blob, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw error;
  } else {
    return data;
  }
};

/**
 * Upload multiple photos to Supabase storage.
 * @param userId The id belonging to the session user.
 * @param uris An array of local uris for the images.
 */
export const bulkUploadImage = async (userId: string, uris: string[]) => {
  uris.map(async (uri) => {
    await uploadImage(userId, uri);
  });
};
