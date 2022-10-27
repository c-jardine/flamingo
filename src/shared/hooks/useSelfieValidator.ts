import {
  CompareFacesCommand,
  CompareFacesRequest,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';
import { CameraCapturedPicture } from 'expo-camera';
import Constants from 'expo-constants';
import React from 'react';
import { Buffer } from 'buffer';

export type SelfieScannerProps = [
  isScanning: boolean,
  isValid: boolean,
  validate: () => void
];

const accessKeyId = Constants?.manifest?.extra?.awsAccessKeyId as string;
const secretKey = Constants?.manifest?.extra?.awsSecretAccessKey as string;

export const useSelfieValidator = (
  sourceImage: CameraCapturedPicture | null,
  targetImage: CameraCapturedPicture | null
): SelfieScannerProps => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const validate = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const rekognitionClient = new RekognitionClient({
        region: 'us-east-2',
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretKey,
        },
      });

      const sourceResult = sourceImage?.base64 as string;
      const sourceData = Buffer.from(sourceResult, 'base64');
      const targetResult = targetImage?.base64 as string;
      const targetData = Buffer.from(targetResult, 'base64');

      const input = {
        SourceImage: {
          Image: { Bytes: sourceData },
        },
        TargetImage: {
          Image: { Bytes: targetData },
        },
      } as CompareFacesRequest;

      const command = new CompareFacesCommand(input);
      const data = await rekognitionClient.send(command);
      setIsValid(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return [isLoading, isValid, validate];
};
