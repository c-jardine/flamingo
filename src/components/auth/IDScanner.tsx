import {
  AnalyzeIDCommand,
  AnalyzeIDRequest,
  TextractClient,
} from '@aws-sdk/client-textract';
import { Buffer } from 'buffer';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Button, View } from 'react-native';
import 'react-native-get-random-values';
import { IDRequiredFields, IDType } from '../../constants/idScanner';

const accessKeyId = Constants?.manifest?.extra?.awsAccessKeyId as string;
const secretKey = Constants?.manifest?.extra?.awsSecretAccessKey as string;

const IDScanner = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [valid, setValid] = React.useState<boolean>(false);
  const cameraResult = async () => {
    // Check for camera permissions.
    await ImagePicker.requestCameraPermissionsAsync();

    // Open the camera.
    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });

    if (!result.cancelled) {
      const b = Buffer.from(result?.base64, 'base64');

      const textractClient = new TextractClient({
        region: 'us-east-2',
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretKey,
        },
      });

      try {
        setLoading(true);

        const input = {
          DocumentPages: [{ Bytes: b }],
        } as AnalyzeIDRequest;
        const command = new AnalyzeIDCommand(input);
        const data = await textractClient.send(command);
        const fields = data?.IdentityDocuments[0]?.IdentityDocumentFields || [];

        for (let i = 0; i < fields?.length; i++) {
          const fieldType = fields[i]?.Type?.Text || '';
          const valueConfidence = fields[i]?.ValueDetection?.Confidence || 0;
          const value = fields[i]?.ValueDetection?.Text || '';

          if (IDRequiredFields.includes(fieldType)) {
            if (value !== '' && valueConfidence > 90) {
              setValid(true);
              if (fieldType === 'ID_TYPE' && !IDType.includes(value)) {
                setValid(false);
                break;
              }
            } else {
              setValid(false);
              break;
            }
          }
        }
      } catch (error) {
        console.log('ERRRR', error);
      }
    }
    setLoading(false);
  };
  return (
    <View>
      <Button title='pic' onPress={cameraResult} />
    </View>
  );
};

export default IDScanner;
