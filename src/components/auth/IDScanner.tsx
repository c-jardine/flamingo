import {
  AnalyzeIDCommand,
  AnalyzeIDDetections,
  AnalyzeIDRequest,
  TextractClient,
} from '@aws-sdk/client-textract';
import { Buffer } from 'buffer';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Button, View } from 'react-native';
import 'react-native-get-random-values';
import { IDRequiredFields, IDType } from '../../constants/idScanner';

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
      try {
        setLoading(true);
        const b = Buffer.from(result?.base64, 'base64');
        // const manipulatedResult = await manipulateAsync(
        //   result.uri,
        //   [{ resize: { width: 512 } }],
        //   { compress: 0.5, format: SaveFormat.JPEG }
        // );

        const textractClient = new TextractClient({
          region: 'us-east-2',
          credentials: {
            accessKeyId: 'AKIAY2Y7TRLMIIK24CNX',
            secretAccessKey: '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',
          },
        });
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
                console.log(
                  `BAD ID TYPE - FIELD: ${fieldType} | VALUE: ${value}`
                );
                break;
              }
            } else {
              console.log(
                `EMPTY OR LOW CONFIDENCE - FIELD: ${fieldType} | VALUE: ${value}`
              );
              setValid(false);
              break;
            }
          }
        }
        console.log('VALID', valid);
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
