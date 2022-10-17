import { CameraCapturedPicture } from 'expo-camera';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import IDBoundingBox from '../../components/camera/IDBoundingBox';
import Camera from '../../components/core/Camera';
import Header from '../../components/core/Header';
import BackHeader from '../../components/utils/BackHeader';
import { AuthScreensEnum } from '../../enums/AuthScreenEnum';
import { CameraSetting } from '../../enums/CameraSetting';
import { useIdScanner } from '../../hooks/useIdScanner';
import { AuthScreenNavigatorProps } from '../../types/auth/AuthScreen';

const IDVerification = (props: AuthScreenNavigatorProps) => {
  const [image, setImage] = React.useState<CameraCapturedPicture | null>(null);
  const [isScanning, isValid, scan] = useIdScanner(image, setImage);

  React.useEffect(() => {
    if (isValid) {
      props.navigator(AuthScreensEnum.PHOTO_VERIFICATION);
    }
  }, [isValid]);

  return (
    <View style={{ flex: 1 }}>
      <BackHeader handleBack={() => props.navigator(AuthScreensEnum.SIGN_UP)} />
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
        <Camera
          image={image}
          setImage={setImage}
          boundingBox={IDBoundingBox}
          settings={[
            // CameraSetting.FrontCameraToggle,
            CameraSetting.FlashToggle,
            CameraSetting.AutoFocusToggle,
            CameraSetting.BoundingBoxToggle,
          ]}
          onSubmit={scan}
        />
      </Animated.View>
    </View>
  );
};

export default IDVerification;
