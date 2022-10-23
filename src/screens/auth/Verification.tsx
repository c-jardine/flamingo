import {
  CompareFacesCommand,
  CompareFacesCommandInput,
  CompareFacesResponse,
  FaceMatch,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';
import { Buffer } from 'buffer';
import Constants from 'expo-constants';
import React from 'react';
import { Text, View } from 'react-native';
import { Toast } from '../../components/common';
import { ThemeContext } from '../../providers';
import { AuthScreenNavigatorProps } from '../../types/auth/AuthScreen';
import IDVerification from './IDVerification';
import PhotoVerification from './PhotoVerification';

export type AwsEncodedImage = {
  Image: {
    Bytes: Buffer;
  }[];
};

const accessKeyId = Constants?.manifest?.extra?.awsAccessKeyId as string;
const secretKey = Constants?.manifest?.extra?.awsSecretAccessKey as string;

const Verification = (props: AuthScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);
  const [idImage, setIdImage] = React.useState<Buffer | null>(null);
  const [selfie, setSelfie] = React.useState<Buffer | null>(null);
  const [validId, setValidId] = React.useState(false);
  const [userVerified, setUserVerified] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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

      const input = {
        SourceImage: {
          Bytes: idImage,
        },
        TargetImage: {
          Bytes: selfie,
        },
      } as CompareFacesCommandInput;

      const command = new CompareFacesCommand(input);
      const data: CompareFacesResponse = await rekognitionClient.send(command);

      const matches = data.FaceMatches as FaceMatch[];
      if (matches.length > 0) {
        const confidence = matches[0].Face?.Confidence as FaceMatch;

        confidence > 90 ? setUserVerified(true) : setUserVerified(false);
      } else {
        Toast.error('Unable to verify');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    (async () => {
      if (idImage && selfie) {
        await validate();
      }
    })();
  }, [idImage, selfie]);

  return (
    <View style={{ flex: 1 }}>
      {!validId && (
        <IDVerification setValidId={setValidId} setIdImage={setIdImage} />
      )}
      {validId && !userVerified && <PhotoVerification setSelfie={setSelfie} />}
      {userVerified && (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 32, color: 'red' }}>YAY!</Text>
        </View>
      )}
    </View>
  );
};

export default Verification;
