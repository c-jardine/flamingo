import {
  AnalyzeIDCommand,
  AnalyzeIDCommandInput,
  TextractClient,
} from '@aws-sdk/client-textract';
import { Buffer } from 'buffer';
import { CameraCapturedPicture } from 'expo-camera';
import Constants from 'expo-constants';
import React, { SetStateAction } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import { Camera, CameraSettingsEnum } from '../../components/camera';
import { IdBoundingBox } from '../../components/camera/BoundingBox';
import { Header } from '../../components/common';
import { IdRequiredFields, IdType } from '../../shared/constants/IdScanner';
import { ThemeContext } from '../../providers';

const accessKeyId = Constants?.manifest?.extra?.awsAccessKeyId as string;
const secretKey = Constants?.manifest?.extra?.awsSecretAccessKey as string;

const IDVerification = (props: {
  setIdImage: React.Dispatch<SetStateAction<Buffer | null>>;
  setValidId: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { theme } = React.useContext(ThemeContext);
  const [image, setImage] = React.useState<CameraCapturedPicture | null>(null);
  const [isScanning, setIsScanning] = React.useState<boolean>(false);

  const _scan = async (): Promise<void> => {
    try {
      setIsScanning(true);

      const textractClient = new TextractClient({
        region: 'us-east-2',
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretKey,
        },
      });

      const result = image?.base64 as string;
      const b = Buffer.from(result, 'base64');
      props.setIdImage(b);

      const input = {
        DocumentPages: [{ Bytes: b }],
      } as AnalyzeIDCommandInput;

      const command = new AnalyzeIDCommand(input);
      const res = await textractClient.send(command);
      const fields =
        (res?.IdentityDocuments &&
          res.IdentityDocuments[0].IdentityDocumentFields) ||
        [];

      for (let i = 0; i < fields?.length; i++) {
        const fieldType = fields[i]?.Type?.Text || '';
        const valueConfidence = fields[i]?.ValueDetection?.Confidence || 0;
        const value = fields[i]?.ValueDetection?.Text || '';

        if (IdRequiredFields.includes(fieldType)) {
          if (value !== '' && valueConfidence > 90) {
            props.setValidId(true);
            if (fieldType === 'ID_TYPE' && !IdType.includes(value)) {
              setIsScanning(false);
              props.setValidId(false);
              setImage(null);
              console.log(
                `BAD ID TYPE - FIELD: ${fieldType} | VALUE: ${value}`
              );
              return;
            }
          } else {
            console.log(
              `EMPTY OR LOW CONFIDENCE - FIELD: ${fieldType} | VALUE: ${value}`
            );
            setIsScanning(false);
            props.setValidId(false);
            setImage(null);
            return;
          }
        }
      }
      setIsScanning(false);
    } catch (error) {
      setIsScanning(false);
      setImage(null);
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        entering={FadeIn.duration(200).delay(500)}
        exiting={FadeOut.duration(200)}
        style={{ flex: 1 }}
      >
        <Header>
          <Header.Title>Identity verification</Header.Title>
          <Header.Description>
            To keep Flamingo users safe, we require users to verify their
            identity with a state ID or driver's license. Don't worry, it won't
            be stored.
          </Header.Description>
        </Header>
        {!isScanning ? (
          <Animated.View
            entering={ZoomIn.duration(200)}
            exiting={ZoomOut.duration(200)}
          >
            <Camera
              image={image}
              setImage={setImage}
              boundingBox={IdBoundingBox}
              settings={[
                CameraSettingsEnum.FlashToggle,
                CameraSettingsEnum.AutoFocusToggle,
                CameraSettingsEnum.BoundingBoxToggle,
              ]}
              onSubmit={_scan}
            />
          </Animated.View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size='large' color={theme.colors.primary} />
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default IDVerification;
