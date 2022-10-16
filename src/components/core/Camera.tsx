import {
  AutoFocus,
  Camera as RNCamera,
  CameraCapturedPicture,
  CameraPictureOptions,
  CameraType,
  FlashMode,
} from 'expo-camera';
import React, { SetStateAction } from 'react';
import { Image, View } from 'react-native';
import { CameraSetting } from '../../enums/CameraSetting';
import { ThemeContext } from '../../provider/ThemeProvider';
import CameraActionBar from '../camera/CameraActionBar';
import CameraSettings from '../camera/CameraSettings';
import FocusSlider from '../camera/FocusSlider';

interface CameraProps {
  boundingBox: React.ComponentType;
  image: CameraCapturedPicture | null;
  setImage: React.Dispatch<SetStateAction<CameraCapturedPicture | null>>;
  settings: CameraSetting[];
  onSubmit: () => void;
}

const Camera = (props: CameraProps) => {
  const { theme } = React.useContext(ThemeContext);

  const [isCameraReady, setIsCameraReady] = React.useState<boolean>(false);
  const [isFlashEnabled, setIsFlashEnabled] = React.useState<boolean>(false);
  const [isFrontCameraEnabled, setIsFrontCameraEnabled] =
    React.useState<boolean>(false);
  const [isAutoFocusEnabled, setIsAutoFocusEnabled] =
    React.useState<boolean>(true);
  const [isBoundingBoxEnabled, setIsBoundingBoxEnabled] =
    React.useState<boolean>(false);

  const [focusDepth, setFocusDepth] = React.useState<number>(0);

  const BoundingBox =
    props.boundingBox && React.createElement(props.boundingBox, {});

  // Needed to call component functions on the Camera.
  const cameraRef = React.useRef<RNCamera>(null);

  const handleTakePhoto = async () => {
    if (isCameraReady) {
      const result = await cameraRef.current?.takePictureAsync({
        aspect: [1, 1],
        quality: 1,
        base64: true,
      } as CameraPictureOptions);
      if (result) {
        props.setImage(result);
      }
    }
  };

  const handleRetake = () => {
    props.setImage(null);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: theme.spacing.xxl,
      }}
    >
      <RNCamera
        ref={cameraRef}
        type={isFrontCameraEnabled ? CameraType.front : CameraType.back}
        flashMode={isFlashEnabled ? FlashMode.on : FlashMode.off}
        autoFocus={isAutoFocusEnabled ? AutoFocus.on : AutoFocus.off}
        focusDepth={focusDepth}
        onCameraReady={() => setIsCameraReady(true)}
        style={{
          width: '100%',
          aspectRatio: 1,
        }}
      >
        {/* Camera view */}
        {props.image !== null ? (
          // If photo has been taken, show it
          props.image.uri && (
            <Image source={{ uri: props.image?.uri }} style={{ flex: 1 }} />
          )
        ) : (
          // Otherwise, show the camera view and overlays
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Bounding box */}
            {props.settings.includes(CameraSetting.BoundingBoxToggle) &&
              isBoundingBoxEnabled &&
              BoundingBox}

            {/* Camera settings bar */}
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            >
              <CameraSettings
                settings={props.settings}
                isFrontCameraEnabled={isFrontCameraEnabled}
                setIsFrontCameraEnabled={setIsFrontCameraEnabled}
                isFlashEnabled={isFlashEnabled}
                setIsFlashEnabled={setIsFlashEnabled}
                isAutoFocusEnabled={isAutoFocusEnabled}
                setIsAutoFocusEnabled={setIsAutoFocusEnabled}
                isBoundingBoxEnabled={isBoundingBoxEnabled}
                setIsBoundingBoxEnabled={setIsBoundingBoxEnabled}
              />
            </View>

            {/* Focus slider */}
            {!isAutoFocusEnabled && !isFrontCameraEnabled && (
              <FocusSlider setFocusDepth={setFocusDepth} />
            )}
          </View>
        )}
      </RNCamera>

      {/* Camera action bar */}
      <CameraActionBar
        handleTakePhoto={handleTakePhoto}
        handleRetake={handleRetake}
        image={props.image}
        onSubmit={props.onSubmit}
      />
    </View>
  );
};

export default Camera;
