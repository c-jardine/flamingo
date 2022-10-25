import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  ArrowNavigator,
  Modal,
  Text,
  Thumbnail,
} from '../../../components/common';
import { FormPageLayout } from '../../../components/layouts';
import { ThemeContext } from '../../../providers';
import { useDisclosure } from '../../../shared/hooks/useDisclosure';
import { PhotoUploadScreenProps } from './PhotoUploadScreen.types';

const accessKeyId = Constants?.manifest?.extra?.awsAccessKeyId as string;
const secretKey = Constants?.manifest?.extra?.awsSecretAccessKey as string;

const PhotoUploadScreen = (props: PhotoUploadScreenProps) => {
  const { theme } = React.useContext(ThemeContext);
  const [images, setImages] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useDisclosure();

  const _takePhoto = async () => {
    let result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

    console.log(result);

    if (!result.cancelled) {
      const uri = result?.uri;
      setImages((prev) => [uri, ...prev]);
    }
  };

  return (
    <FormPageLayout>
      <FormPageLayout.PageHeader
        title='Upload some selfies'
        description='At least one photo is required, but you can add up to three now or more later.'
      />
      <FormPageLayout.PageContent>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {images.length < 3 && (
            <View
              style={{
                width: `${100 / 3}%`,
                aspectRatio: 1,
                padding: 4,
              }}
            >
              <TouchableOpacity
                onPress={_takePhoto}
                style={{
                  borderRadius: 16,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: theme.colors.text[50],
                }}
              >
                <MaterialCommunityIcons
                  name='plus'
                  size={32}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
          )}

          {images.map((image) => (
            <Thumbnail
              uri={image}
              onDelete={
                () => setImages(images.filter((img) => img !== image))
                //
              }
            />
          ))}
        </View>
      </FormPageLayout.PageContent>

      {/* Footer */}
      <FormPageLayout.PageFooter>
        <ArrowNavigator
          backComponent={{
            disabled: false,
            onPress: () => props.navigation.goBack(),
          }}
          nextComponent={{
            visible: false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};
export default PhotoUploadScreen;
