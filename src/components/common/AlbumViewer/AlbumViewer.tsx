import React from 'react';
import { Text, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { ImageSource } from 'react-native-image-viewing/dist/@types';
import { ThemeContext } from '../../../providers';
import { supabase } from '../../../supabase';
import AlbumViewerProps from './AlbumViewer.types';

const AlbumViewer = (props: AlbumViewerProps) => {
  const { theme } = React.useContext(ThemeContext);

  const [photos, setPhotos] = React.useState<
    (ImageSource & { name: string })[]
  >([]);
  const [initialIndex, setInitialIndex] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const { data: album, error } = await supabase.storage
        .from('albums')
        .list(props.albumId, {
          limit: 5,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (album) {
        const images: (ImageSource & { name: string })[] = album
          ?.map((a) => {
            if (a.name !== '.emptyFolderPlaceholder') {
              const location = `${props.albumId}/${a.name}`;
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
  }, [props.albumId]);

  React.useEffect(() => {
    const initIndex = photos.findIndex((a: { name: string }) => {
      return `${props.albumId}/${a.name}` === props.initialPhoto;
    });
    if (initIndex !== -1) {
      setInitialIndex(initIndex);
    }
  }, [props.initialPhoto]);

  return (
    <ImageView
      animationType='slide'
      backgroundColor={theme.colors.background}
      images={photos}
      imageIndex={initialIndex}
      visible={props.isVisible}
      onRequestClose={() => props.setIsVisible(false)}
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
                backgroundColor: theme.colors.primary,
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
              backgroundColor: theme.colors.text['50'],
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
