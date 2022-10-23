import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AlbumViewer,
  Header,
  MenuItem,
  Modal,
  Photo,
  Toast,
} from '../../components/common';
import { useCamera } from '../../hooks/useCamera';
import { useDisclosure } from '../../hooks/useDisclosure';
import { supabase } from '../../initSupabase';
import { AuthContext } from '../../provider/AuthProvider';
import { ThemeContext } from '../../provider/ThemeProvider';
import {
  PhotoAlbumScreenNavigationProp,
  PhotoAlbumScreenRouteProp,
} from '../../types';

const PhotoAlbum = (props: {
  navigation: PhotoAlbumScreenNavigationProp;
  route: PhotoAlbumScreenRouteProp;
}) => {
  const { theme } = React.useContext(ThemeContext);

  const { session } = React.useContext(AuthContext);

  const [cameraResult, loading] = useCamera();
  const [albumViewerIsOpen, setAlbumViewerIsOpen] = useDisclosure();
  const [uploadModalIsOpen, setUploadModalIsOpen] = useDisclosure();
  const [photos, setPhotos] = React.useState<any>(false);
  const [selectedPhoto, setSelectedPhoto] = React.useState<string>();
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

  const getPhotos = async () => {
    const { data, error } = await supabase.storage
      .from('albums')
      .list(props.route.params.id, {
        limit: 10,
        sortBy: { column: 'created_at', order: 'desc' },
      });

    return data;
  };

  React.useEffect(() => {
    (async () => {
      const photos = await getPhotos();
      setPhotos(photos);
    })();
    setIsRefreshing(false);
  }, [isRefreshing, photos]);

  const withCamera = async () => {
    const res = await cameraResult();
    if (res) {
      cameraResult();
      Toast.success('Successfully uploaded!');
    }
    setUploadModalIsOpen(false);
  };

  const handleOpenAlbumViewer = (photo: any) => {
    setAlbumViewerIsOpen(true);
    const path = `${props.route.params.id}/${photo.name}`;
    setSelectedPhoto(path);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: 64,
      }}
    >
      <Header>
        <Header.Title>Photos</Header.Title>
        {props.route.params.id === session?.user?.id && (
          <Header.Description>
            Change your profile photo, add and remove photos, and manage photo
            comments.
          </Header.Description>
        )}
      </Header>
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => setIsRefreshing(true)}
            />
          }
          contentContainerStyle={{
            paddingVertical: 16,
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {photos &&
              photos.map((photo: any, index: number) => (
                <TouchableOpacity
                  onPress={() => handleOpenAlbumViewer(photo)}
                  key={index}
                  style={{
                    width: '33.33%',
                    aspectRatio: 1,
                    padding: 1,
                  }}
                >
                  <Photo
                    path={`${props.route.params.id}/${photo.name}`}
                    imgStyle={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </TouchableOpacity>
              ))}
          </View>
          {props.route.params.id === session?.user?.id && photos.length < 5 && (
            <TouchableOpacity
              onPress={() => setUploadModalIsOpen(true)}
              style={{
                flex: 1,
                paddingVertical: 16,
                borderRadius: 16,
                backgroundColor: theme.colors.text[100],
                alignItems: 'center',
                marginTop: 32,
              }}
            >
              <MaterialCommunityIcons
                name='plus'
                size={32}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
      <AlbumViewer
        albumId={props.route.params.id}
        isVisible={albumViewerIsOpen}
        setIsVisible={setAlbumViewerIsOpen}
        initialPhoto={selectedPhoto}
      />
      <Modal isVisible={uploadModalIsOpen} setIsVisible={setUploadModalIsOpen}>
        <Text
          style={{
            color: theme.colors.text['800'],
            fontSize: 18,
            marginTop: 16,
          }}
        >
          Upload a photo
        </Text>
        <MenuItem onPress={withCamera}>Open camera</MenuItem>
        <MenuItem>Open media library</MenuItem>
      </Modal>
    </View>
  );
};

export default PhotoAlbum;
