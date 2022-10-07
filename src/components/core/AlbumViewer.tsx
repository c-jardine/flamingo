import React from 'react';
import { Text, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { ImageSource } from 'react-native-image-viewing/dist/@types';
import { supabase } from '../../initSupabase';
import { Color } from '../../styles/Color';

const AlbumViewer = ({
  albumId,
  isVisible,
  setIsVisible,
  initialPhoto,
}: {
  albumId: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  initialPhoto: any;
}) => {
  const [photos, setPhotos] = React.useState<
    (ImageSource & { name: string })[]
  >([]);
  const [initialIndex, setInitialIndex] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const { data: album, error } = await supabase.storage
        .from('albums')
        .list(albumId, {
          limit: 5,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (album) {
        const images: (ImageSource & { name: string })[] = album
          ?.map((a) => {
            if (a.name !== '.emptyFolderPlaceholder') {
              const location = `${albumId}/${a.name}`;
              const { data, error } = supabase.storage
                .from('albums')
                .getPublicUrl(location);
              return { uri: data?.publicURL, name: a.name } as ImageSource & {
                name: string;
              };
            }
          })
          .filter((i) => i !== undefined);
        setPhotos(images);
      }
    })();
  }, [albumId]);

  React.useEffect(() => {
    const initIndex = photos.findIndex((a: { name: string }) => {
      return `${albumId}/${a.name}` === initialPhoto;
    });
    if (initIndex !== -1) {
      setInitialIndex(initIndex);
    }
  }, [initialPhoto]);

  return (
    <ImageView
      animationType='slide'
      backgroundColor={Color.base}
      images={photos}
      imageIndex={initialIndex}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      HeaderComponent={({ imageIndex }) => {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 64,
            }}
          >
            <View
              style={{
                backgroundColor: Color.primary,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                {imageIndex + 1} of {photos.length}
              </Text>
            </View>
          </View>
        );
      }}
      FooterComponent={({ imageIndex }) => {
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: Color.accent[50],
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 32, color: 'red' }}>Pic</Text>
          </View>
        );
      }}
    />
  );
};

export default AlbumViewer;
