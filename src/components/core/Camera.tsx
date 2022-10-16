import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import {
  AutoFocus,
  Camera as RNCamera,
  CameraCapturedPicture,
  CameraPictureOptions,
  FlashMode,
} from 'expo-camera';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { ThemeContext } from '../../provider/ThemeProvider';
import CameraSettingsButton from './CameraSettingsButton';

const Camera = () => {
  const { theme } = React.useContext(ThemeContext);
  const [isCameraReady, setIsCameraReady] = React.useState<boolean>(false);
  const [isSettingsEnabled, setIsSettingsEnabled] =
    React.useState<boolean>(false);
  const [isFlashEnabled, setIsFlashEnabled] = React.useState<boolean>(false);
  const [isBoundingBoxEnabled, setIsBoundingBoxEnabled] =
    React.useState<boolean>(true);
  const [isAutoFocusEnabled, setIsAutoFocusEnabled] =
    React.useState<boolean>(true);
  const [focusDepth, setFocusDepth] = React.useState<number>(0);

  const [image, setImage] = React.useState<CameraCapturedPicture | null>(null);

  const cameraRef = React.useRef<RNCamera>(null);

  const handleTakePhoto = async () => {
    if (isCameraReady) {
      const result = await cameraRef.current?.takePictureAsync({
        aspect: [1, 1],
        quality: 0.75,
        base64: true,
      } as CameraPictureOptions);
      if (result) {
        setImage(result);
      }
    }
  };

  const handleEnableSettings = () => {
    setIsSettingsEnabled(!isSettingsEnabled);
  };

  const handleEnableFlash = () => {
    setIsFlashEnabled(!isFlashEnabled);
  };

  const handleEnableBoundingBox = () => {
    setIsBoundingBoxEnabled(!isBoundingBoxEnabled);
  };

  const handleEnableAutoFocus = () => {
    setIsAutoFocusEnabled(!isAutoFocusEnabled);
  };

  const handleRetake = () => {
    setImage(null);
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
        flashMode={isFlashEnabled ? FlashMode.on : FlashMode.off}
        autoFocus={isAutoFocusEnabled ? AutoFocus.on : AutoFocus.off}
        focusDepth={focusDepth}
        style={{
          width: '100%',
          aspectRatio: 1,
        }}
        onCameraReady={() => setIsCameraReady(true)}
      >
        {image !== null ? (
          <Image source={{ uri: image?.uri }} style={{ flex: 1 }} />
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            {isBoundingBoxEnabled && (
              <View
                style={{
                  width: '80%',
                  aspectRatio: 1.59,
                  borderWidth: 0.5,
                  borderColor: theme.colors.text['800'],
                  borderRadius: 16,
                }}
              />
            )}
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            >
              <CameraSettingsButton
                name='dots-horizontal'
                isEnabled={isSettingsEnabled}
                handleAction={handleEnableSettings}
              />
              {isSettingsEnabled && (
                <View>
                  <Animated.View
                    entering={ZoomIn.duration(200)}
                    exiting={ZoomOut.duration(200).delay(200)}
                  >
                    <CameraSettingsButton
                      name='flash'
                      isEnabled={isFlashEnabled}
                      handleAction={handleEnableFlash}
                    />
                  </Animated.View>

                  <Animated.View
                    entering={ZoomIn.duration(200).delay(100)}
                    exiting={ZoomOut.duration(200).delay(100)}
                  >
                    <CameraSettingsButton
                      name='focus-auto'
                      isEnabled={isAutoFocusEnabled}
                      handleAction={handleEnableAutoFocus}
                    />
                  </Animated.View>

                  <Animated.View
                    entering={ZoomIn.duration(200).delay(200)}
                    exiting={ZoomOut.duration(200)}
                  >
                    <CameraSettingsButton
                      name='crop-free'
                      isEnabled={isBoundingBoxEnabled}
                      handleAction={handleEnableBoundingBox}
                    />
                  </Animated.View>
                </View>
              )}
            </View>
            {!isAutoFocusEnabled && (
              <Animated.View
                entering={ZoomIn.duration(200)}
                exiting={ZoomOut.duration(200)}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  zIndex: 10,
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Slider
                  style={{
                    width: '50%',
                    height: 40,
                  }}
                  onValueChange={setFocusDepth}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor={theme.colors.text['200']}
                  maximumTrackTintColor={theme.colors.text['200']}
                  thumbTintColor={theme.colors.white}
                />
              </Animated.View>
            )}
          </View>
        )}
      </RNCamera>
      <View style={{ alignItems: 'center', marginTop: theme.spacing.xl }}>
        {image === null ? (
          <TouchableOpacity
            onPress={handleTakePhoto}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
              width: 64,
              height: 64,
              backgroundColor: theme.colors.white,
            }}
          >
            <MaterialCommunityIcons name='camera' size={32} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleRetake}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
              width: 64,
              height: 64,
              backgroundColor: theme.colors.white,
            }}
          >
            <MaterialCommunityIcons name='reload' size={32} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Camera;
