import {
  AutoFocus,
  Camera as RNCamera,
  CameraType,
  FlashMode,
} from 'expo-camera';
import React from 'react';
import { Image, View } from 'react-native';
import { ThemeContext } from '../../../providers';
import { CameraActionBar } from '../CameraActionBar';
import { FocusSlider, SettingsMenu, SettingsMenuEnum } from '../settings';
import { CameraProps } from '../types';
import { _takePhoto } from './Camera.actions';

const Camera = (props: CameraProps) => {
  const { theme } = React.useContext(ThemeContext);

  const [isCameraReady, setIsCameraReady] = React.useState<boolean>(false);

  // Camera settings
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

  const _handleTakePhoto = async () => {
    if (isCameraReady) {
      const result = await _takePhoto(cameraRef);
      if (result) {
        props.setImage(result);
      }
    }
  };

  const _handleRetake = () => {
    props.setImage(null);
  };

  React.useEffect(() => {
    if (props.defaultCamera && props.defaultCamera === CameraType.front) {
      setIsFrontCameraEnabled(true);
    } else {
      setIsFrontCameraEnabled(false);
    }
  }, [isFrontCameraEnabled]);

  return (
    <View
      style={{
        flex: 1,
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
            {props.settings.includes(SettingsMenuEnum.BoundingBoxToggle) &&
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
              <SettingsMenu
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
      {isCameraReady && (
        <CameraActionBar
          handleTakePhoto={_handleTakePhoto}
          handleRetake={_handleRetake}
          image={props.image}
          onSubmit={props.onSubmit}
        />
      )}
    </View>
  );
};

export default Camera;
