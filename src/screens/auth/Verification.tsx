import { CameraCapturedPicture } from 'expo-camera';
import React from 'react';
import { Text, View } from 'react-native';
import BackHeader from '../../components/utils/BackHeader';
import { AuthScreensEnum } from '../../enums/AuthScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { AuthScreenNavigatorProps } from '../../types/auth/AuthScreen';
import IDVerification from './IDVerification';
import PhotoVerification from './PhotoVerification';

export type AwsEncodedImage = {
  Image: {
    Bytes: Buffer;
  }[];
};

const Verification = (props: AuthScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);
  const [idImage, setIdImage] = React.useState<CameraCapturedPicture | null>(
    null
  );
  const [validId, setValidId] = React.useState(false);
  const [userVerified, setUserVerified] = React.useState(false);

  return (
    <View style={{ flex: 1 }}>
      <BackHeader handleBack={() => props.navigator(AuthScreensEnum.SIGN_UP)} />
      {!validId && (
        <IDVerification setValidId={setValidId} setIdImage={setIdImage} />
      )}
      {/* {validId && !userVerified && (
        <PhotoVerification
          setUserVerified={setUserVerified}
          sourceImage={idImage}
        />
      )} */}
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
