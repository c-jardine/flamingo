import { CameraCapturedPicture, CameraType } from 'expo-camera';
import React, { SetStateAction } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import Camera from '../../components/core/Camera';
import Header from '../../components/core/Header';
import { CameraSetting } from '../../enums/CameraSetting';
import { ThemeContext } from '../../provider/ThemeProvider';
import { useSelfieValidator } from '../../hooks/useSelfieValidator';

const PhotoVerification = (props: {
  setUserVerified: React.Dispatch<SetStateAction<boolean>>;
  sourceImage: CameraCapturedPicture | null;
}) => {
  const { theme } = React.useContext(ThemeContext);
  const [image, setImage] = React.useState<CameraCapturedPicture | null>(null);
  const [isScanning, isValid, scan] = useSelfieValidator(
    image,
    props.sourceImage
  );
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        entering={FadeIn.duration(200).delay(500)}
        exiting={FadeOut.duration(200)}
        style={{ flex: 1 }}
      >
        <Header>
          <Header.Title>Let's make sure it's you</Header.Title>
          <Header.Description>
            Now take a selfie to verify against your ID. Try to keep a calm
            appearance.
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
              settings={[
                CameraSetting.FrontCameraToggle,
                CameraSetting.FlashToggle,
                CameraSetting.AutoFocusToggle,
              ]}
              onSubmit={scan}
              defaultCamera={CameraType.front}
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
export default PhotoVerification;
