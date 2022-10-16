import {
  AnalyzeIDCommand,
  AnalyzeIDRequest,
  TextractClient,
} from '@aws-sdk/client-textract';
import { Buffer } from 'buffer';
import { CameraCapturedPicture } from 'expo-camera';
import Constants from 'expo-constants';
import React from 'react';
import { View } from 'react-native';
import IDBoundingBox from '../../components/camera/IDBoundingBox';
import Camera from '../../components/core/Camera';
import Header from '../../components/core/Header';
import { IDRequiredFields, IDType } from '../../constants/idScanner';
import { CameraSetting } from '../../enums/CameraSetting';
import { ThemeContext } from '../../provider/ThemeProvider';

const accessKeyId = Constants?.manifest?.extra?.awsAccessKeyId as string;
const secretKey = Constants?.manifest?.extra?.awsSecretAccessKey as string;

const IDVerification = () => {
  const { theme } = React.useContext(ThemeContext);

  const [image, setImage] = React.useState<CameraCapturedPicture | null>(null);

  const [isScanning, setIsScanning] = React.useState<boolean>(false);
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const handleIdScan = async () => {
    try {
      setIsScanning(true);

      const result = image?.base64 as string;
      const b = Buffer.from(result, 'base64');

      const textractClient = new TextractClient({
        region: 'us-east-2',
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretKey,
        },
      });

      const input = {
        DocumentPages: [{ Bytes: b }],
      } as AnalyzeIDRequest;
      const command = new AnalyzeIDCommand(input);
      const data = await textractClient.send(command);
      const fields =
        (data?.IdentityDocuments &&
          data.IdentityDocuments[0].IdentityDocumentFields) ||
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: 64,
      }}
    >
      <Header>
        <Header.Title>Identity verification</Header.Title>
        <Header.Description>
          To keep Flamingo users safe, we require users to verify their identity
          with a state ID or driver's license. Don't worry, it won't be stored.
        </Header.Description>
      </Header>
      <Camera
        image={image}
        setImage={setImage}
        boundingBox={IDBoundingBox}
        settings={[
          CameraSetting.FrontCameraToggle,
          CameraSetting.FlashToggle,
          CameraSetting.AutoFocusToggle,
          CameraSetting.BoundingBoxToggle,
        ]}
        onSubmit={handleIdScan}
      />
    </View>
  );
};

export default IDVerification;
