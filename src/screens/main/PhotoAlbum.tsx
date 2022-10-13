import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AlbumViewer from '../../components/core/AlbumViewer';
import Header from '../../components/core/Header';
import MenuItem from '../../components/core/MenuItem';
import Modal from '../../components/core/Modal';
import Photo from '../../components/core/Photo';
import { KToast } from '../../components/utils/KToast';
import { useCamera } from '../../hooks/useCamera';
import { useDisclosure } from '../../hooks/useDisclosure';
import { supabase } from '../../initSupabase';
import { AuthContext } from '../../provider/AuthProvider';
import { Color } from '../../styles/Color';
import {
  PhotoAlbumScreenNavigationProp,
  PhotoAlbumScreenRouteProp,
} from '../../types';

export default function ({
  navigation,
  route,
}: {
  navigation: PhotoAlbumScreenNavigationProp;
  route: PhotoAlbumScreenRouteProp;
}) {
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
      .list(route.params.id, {
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
      KToast.success('Successfully uploaded!');
    }
    setUploadModalIsOpen(false);
  };

  const handleOpenAlbumViewer = (photo: any) => {
    setAlbumViewerIsOpen(true);
    const path = `${route.params.id}/${photo.name}`;
    setSelectedPhoto(path);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.base,
        paddingTop: 64,
      }}
    >
      <Header>
        <Header.Title>Photos</Header.Title>
        {route.params.id === session?.user?.id && (
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
                    path={`${route.params.id}/${photo.name}`}
                    imgStyle={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </TouchableOpacity>
              ))}
          </View>
          {route.params.id === session?.user?.id && photos.length < 5 && (
            <TouchableOpacity
              onPress={() => setUploadModalIsOpen(true)}
              style={{
                flex: 1,
                paddingVertical: 16,
                borderRadius: 16,
                backgroundColor: Color.accent[100],
                alignItems: 'center',
                marginTop: 32,
              }}
            >
              <MaterialCommunityIcons
                name='plus'
                size={32}
                color={Color.primary}
              />
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
      <AlbumViewer
        albumId={route.params.id}
        isVisible={albumViewerIsOpen}
        setIsVisible={setAlbumViewerIsOpen}
        initialPhoto={selectedPhoto}
      />
      <Modal isVisible={uploadModalIsOpen} setIsVisible={setUploadModalIsOpen}>
        <Text
          style={{ color: Color.text.primary, fontSize: 18, marginTop: 16 }}
        >
          Upload a photo
        </Text>
        <MenuItem onPress={withCamera}>Open camera</MenuItem>
        <MenuItem>Open media library</MenuItem>
      </Modal>
    </View>
  );
}
