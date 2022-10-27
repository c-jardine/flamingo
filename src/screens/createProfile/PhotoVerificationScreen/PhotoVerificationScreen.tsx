import {
  CompareFacesCommand,
  CompareFacesCommandInput,
  CompareFacesResponse,
  FaceMatch,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';
import { Buffer } from 'buffer';
import { CameraCapturedPicture, CameraType } from 'expo-camera';
import Constants from 'expo-constants';
import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, SettingsMenuEnum } from '../../../components/camera';
import { ArrowNavigator, Toast } from '../../../components/common';
import { FormPageLayout } from '../../../components/layouts';
import { ThemeContext } from '../../../providers';
import AuthContext from '../../../providers/AuthProvider/AuthContext';
import { setIsVerified } from '../../../redux/slices/verificationSlice';
import { RootState } from '../../../redux/store';
import { supabase } from '../../../supabase/supabase';
import { PhotoVerificationScreenProps } from './PhotoVerificationScreen.types';

const accessKeyId = Constants?.manifest?.extra?.awsAccessKeyId as string;
const secretKey = Constants?.manifest?.extra?.awsSecretAccessKey as string;

const PhotoVerificationScreen = (props: PhotoVerificationScreenProps) => {
  const { theme } = React.useContext(ThemeContext);
  const [image, setImage] = React.useState<CameraCapturedPicture | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { session } = React.useContext(AuthContext);

  const isVerified = useSelector(
    (state: RootState) => state.verificationReducer.isVerified
  );
  const dispatch = useDispatch();

  const idImage = useSelector(
    (state: RootState) => state.verificationReducer.idImage
  ) as string;

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const idData = Buffer.from(idImage, 'base64');
      const selfie = image?.base64 as string;
      const selfieData = Buffer.from(selfie, 'base64');
      const rekognitionClient = new RekognitionClient({
        region: 'us-east-2',
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretKey,
        },
      });

      const input = {
        SourceImage: {
          Bytes: idData,
        },
        TargetImage: {
          Bytes: selfieData as Buffer,
        },
      } as CompareFacesCommandInput;

      const command = new CompareFacesCommand(input);
      const data: CompareFacesResponse = await rekognitionClient.send(command);

      const matches = data.FaceMatches as FaceMatch[];
      if (matches.length > 0) {
        const confidence = matches[0].Face?.Confidence as FaceMatch;

        const userId = session?.user.id;
        if (confidence >= 90) {
          const { data: verifiedData, error: verifiedError } =
            await supabase.rpc('user_verify_identity', {
              user_id: '39e71041-d0af-4e73-bdf9-e89b8f396e5e',
              verification_state: true,
            });
          !verifiedError && dispatch(setIsVerified(true));
          console.log('>90', { verifiedData, verifiedError });
        } else {
          const { data: verifiedData, error: verifiedError } =
            await supabase.rpc('user_verify_identity', {
              user_id: '39e71041-d0af-4e73-bdf9-e89b8f396e5e',
              verification_state: false,
            });
          !verifiedError && dispatch(setIsVerified(false));
          console.log('<90', { verifiedData, verifiedError });
        }
      } else {
        Toast.error('Unable to verify');
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <FormPageLayout>
      <FormPageLayout.PageHeader
        title="Let's make sure it's you"
        description='Now take a selfie to verify against your ID. Try to keep a calm
          appearance.'
      />
      <FormPageLayout.PageContent>
        {!isLoading ? (
          <Animated.View
            entering={ZoomIn.duration(200)}
            exiting={ZoomOut.duration(200)}
          >
            {!isVerified ? (
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
        )}
      </FormPageLayout.PageContent>

      {/* Footer */}
      <FormPageLayout.PageFooter>
        <ArrowNavigator
          backComponent={{
            disabled: false,
            onPress: () => props.navigation.goBack(),
          }}
          nextComponent={{
            // onPress: () => props.navigation.navigate('PersonalInfo'),
            // disabled: image === null || !isValid,
            visible: false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};
export default PhotoVerificationScreen;
