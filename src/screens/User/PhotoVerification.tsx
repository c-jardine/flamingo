import { CameraCapturedPicture, CameraType } from 'expo-camera';
import React, { SetStateAction } from 'react';
import { View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import Camera from '../../components/camera/Camera/Camera';
import Header from '../../components/common/Header/Header';
import { CameraSetting } from '../../enums/CameraSetting';
import { ThemeContext } from '../../provider/ThemeProvider';
import { Buffer } from 'buffer';

const PhotoVerification = (props: {
  setSelfie: React.Dispatch<SetStateAction<Buffer | null>>;
}) => {
  const { theme } = React.useContext(ThemeContext);
  const [image, setImage] = React.useState<CameraCapturedPicture | null>(null);

  const handleSubmit = () => {
    const selfie = image?.base64 as string;
    const selfieData = Buffer.from(selfie, 'base64');
    props.setSelfie(selfieData);
  };

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
            onSubmit={handleSubmit}
            defaultCamera={CameraType.front}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};
export default PhotoVerification;
