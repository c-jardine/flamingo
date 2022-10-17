import { AnalyzeIDRequest } from '@aws-sdk/client-textract';
import { CameraCapturedPicture } from 'expo-camera';
import React, { SetStateAction } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import IDBoundingBox from '../../components/camera/IDBoundingBox';
import Camera from '../../components/core/Camera';
import Header from '../../components/core/Header';
import { CameraSetting } from '../../enums/CameraSetting';
import { useIdScanner } from '../../hooks/useIdScanner';
import { ThemeContext } from '../../provider/ThemeProvider';

const IDVerification = (props: {
  setValidId: React.Dispatch<SetStateAction<boolean>>;
  setIdImage: React.Dispatch<SetStateAction<CameraCapturedPicture | null>>;
}) => {
  const { theme } = React.useContext(ThemeContext);
  const [image, setImage] = React.useState<CameraCapturedPicture | null>(null);
  const [isScanning, isValid, scan] = useIdScanner(image, setImage);

  React.useEffect(() => {
    if (isValid) {
      props.setValidId(true);
      props.setIdImage(image);
    }
  }, [isValid]);

  return (
    <View style={{ flex: 1 }}>
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
        {!isScanning ? (
          <Animated.View
            entering={ZoomIn.duration(200)}
            exiting={ZoomOut.duration(200)}
          >
            <Camera
              image={image}
              setImage={setImage}
              boundingBox={IDBoundingBox}
              settings={[
                CameraSetting.FlashToggle,
                CameraSetting.AutoFocusToggle,
                CameraSetting.BoundingBoxToggle,
              ]}
              onSubmit={scan}
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

export default IDVerification;
