import {
  AnalyzeIDCommand,
  AnalyzeIDRequest,
  TextractClient,
} from '@aws-sdk/client-textract';
import { CameraCapturedPicture } from 'expo-camera';
import Constants from 'expo-constants';
import React, { SetStateAction } from 'react';
import { IDRequiredFields, IDType } from '../constants/idScanner';
import { useEncodeForAws } from './useEncodeForAws';

export type IdScannerProps = [
  isScanning: boolean,
  isValid: boolean,
  scan: () => void
];

const accessKeyId = Constants?.manifest?.extra?.awsAccessKeyId as string;
const secretKey = Constants?.manifest?.extra?.awsSecretAccessKey as string;

export const useIdScanner = (
  image: CameraCapturedPicture | null,
  setImage: React.Dispatch<SetStateAction<CameraCapturedPicture | null>>
): IdScannerProps => {
  const [data] = useEncodeForAws(image);
  const [isScanning, setIsScanning] = React.useState<boolean>(false);
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const scan = async (): Promise<void> => {
    try {
      setIsScanning(true);

      const textractClient = new TextractClient({
        region: 'us-east-2',
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretKey,
        },
      });

      const input = {
        DocumentPages: [{ Bytes: data }],
      } as AnalyzeIDRequest;

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

        if (IDRequiredFields.includes(fieldType)) {
          if (value !== '' && valueConfidence > 90) {
            setIsValid(true);
            if (fieldType === 'ID_TYPE' && !IDType.includes(value)) {
              setIsScanning(false);
              setIsValid(false);
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
            setIsValid(false);
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

  return [isScanning, isValid, scan];
};
