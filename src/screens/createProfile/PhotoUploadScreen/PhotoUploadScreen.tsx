import {
  CompareFacesCommand,
  CompareFacesCommandInput,
  CompareFacesResponse,
  FaceMatch,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Buffer } from 'buffer';
import { CameraCapturedPicture, CameraType } from 'expo-camera';
import Constants from 'expo-constants';
import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import Animated, { BounceIn, SlideInDown } from 'react-native-reanimated';
import { Camera, SettingsMenuEnum } from '../../../components/camera';
import { ArrowNavigator, Button, Toast } from '../../../components/common';
import { FormPageLayout } from '../../../components/layouts';
import { ThemeContext } from '../../../providers';
import { useDisclosure } from '../../../shared/hooks';
import { PhotoUploadScreenProps } from './PhotoUploadScreen.types';
import * as ImagePicker from 'expo-image-picker';

const accessKeyId = Constants?.manifest?.extra?.awsAccessKeyId as string;
const secretKey = Constants?.manifest?.extra?.awsSecretAccessKey as string;

const PhotoUploadScreen = (props: PhotoUploadScreenProps) => {
  const { theme } = React.useContext(ThemeContext);
  const [image, setImage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const _takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result?.uri as string);
    }
  };

  return (
    <FormPageLayout>
      <FormPageLayout.PageHeader
        title='Upload some selfies'
        description='At least one photo is required, but you can add up to three now or more later.'
      />
      <FormPageLayout.PageContent>
        <TouchableOpacity
          onPress={_takePhoto}
          style={{
            borderRadius: 16,
            backgroundColor: theme.colors.text[50],
            justifyContent: 'center',
            alignItems: 'center',
            width: `${100 / 3}%`,
            aspectRatio: 1,
          }}
        >
          <MaterialCommunityIcons
            name='plus'
            size={32}
            color={theme.colors.primary}
          />
        </TouchableOpacity>

        {/* {!isLoading ? (
          <Animated.View
            entering={ZoomIn.duration(200)}
            exiting={ZoomOut.duration(200)}
          >
            {!isValid ? (
              <Camera
                image={image}
                setImage={setImage}
                settings={[
                  SettingsMenuEnum.FrontCameraToggle,
                  SettingsMenuEnum.FlashToggle,
                  SettingsMenuEnum.AutoFocusToggle,
                ]}
                onSubmit={handleSubmit}
                defaultCamera={CameraType.front}
              />
            ) : (
              <Image
                source={{ uri: image?.uri }}
                style={{
                  width: '100%',
                  aspectRatio: 1,
                  marginTop: theme.spacing.xxl,
                }}
              />
            )}
          </Animated.View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size='large' color={theme.colors.primary} />
          </View>
        )} */}
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
