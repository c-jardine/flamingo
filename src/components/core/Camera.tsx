import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import {
  AutoFocus,
  Camera as RNCamera,
  CameraCapturedPicture,
  CameraPictureOptions,
  CameraType,
  FlashMode,
} from 'expo-camera';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import { ThemeContext } from '../../provider/ThemeProvider';
import CameraSettingsButton from './CameraSettingsButton';

const Camera = () => {
  const { theme } = React.useContext(ThemeContext);
  const [isCameraReady, setIsCameraReady] = React.useState<boolean>(false);
  const [isSettingsEnabled, setIsSettingsEnabled] =
    React.useState<boolean>(false);
  const [isFrontCameraEnabled, setIsFrontCameraEnabled] =
    React.useState<boolean>(false);
  const [isFlashEnabled, setIsFlashEnabled] = React.useState<boolean>(false);
  const [isBoundingBoxEnabled, setIsBoundingBoxEnabled] =
    React.useState<boolean>(true);
  const [isAutoFocusEnabled, setIsAutoFocusEnabled] =
    React.useState<boolean>(true);
  const [autoFocusDelay, setAutoFocusDelay] = React.useState(0);
  const [focusDepth, setFocusDepth] = React.useState<number>(0);

  const [image, setImage] = React.useState<CameraCapturedPicture | null>(null);

  const cameraRef = React.useRef<RNCamera>(null);

  const handleTakePhoto = async () => {
    if (isCameraReady) {
      const result = await cameraRef.current?.takePictureAsync({
        aspect: [1, 1],
        quality: 1,
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

  const handleEnableFrontCamera = () => {
    setIsFrontCameraEnabled(!isFrontCameraEnabled);
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
        {image !== null ? (
          <Image source={{ uri: image?.uri }} style={{ flex: 1 }} />
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            {isBoundingBoxEnabled && (
              <Animated.View
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={{
                  width: '80%',
                  aspectRatio: 1.59,
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      width: 25,
                      aspectRatio: 1,
                      borderTopWidth: 0.5,
                      borderLeftWidth: 0.5,
                      borderColor: theme.colors.white,
                    }}
                  />
                  <View
                    style={{
                      width: 25,
                      aspectRatio: 1,
                      borderTopWidth: 0.5,
                      borderRightWidth: 0.5,
                      borderColor: theme.colors.white,
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      width: 25,
                      aspectRatio: 1,
                      borderLeftWidth: 0.5,
                      borderBottomWidth: 0.5,
                      borderColor: theme.colors.white,
                    }}
                  />
                  <View
                    style={{
                      width: 25,
                      aspectRatio: 1,
                      borderRightWidth: 0.5,
                      borderBottomWidth: 0.5,
                      borderColor: theme.colors.white,
                    }}
                  />
                </View>
              </Animated.View>
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
                  {/* Camera type toggle */}
                  <Animated.View
                    layout={Layout.duration(200).delay(200)}
                    entering={ZoomIn.duration(200)}
                    exiting={ZoomOut.duration(200).delay(300)}
                  >
                    <CameraSettingsButton
                      name={
                        isFrontCameraEnabled ? 'camera-rear' : 'camera-front'
                      }
                      isEnabled={isFrontCameraEnabled}
                      handleAction={handleEnableFrontCamera}
                    />
                  </Animated.View>

                  <Animated.View
                    layout={Layout.duration(200).delay(200)}
                    entering={ZoomIn.duration(200).delay(100)}
                    exiting={ZoomOut.duration(200).delay(200)}
                  >
                    {/* Flash toggle */}
                    <CameraSettingsButton
                      name='flash'
                      isEnabled={isFlashEnabled}
                      handleAction={handleEnableFlash}
                    />
                  </Animated.View>

                  {/* Auto focus toggle */}
                  {!isFrontCameraEnabled && (
                    <Animated.View
                      layout={Layout.duration(200).delay(200)}
                      entering={
                        !isFrontCameraEnabled
                          ? ZoomIn.duration(200).delay(300)
                          : ZoomIn.duration(200).delay(200)
                      }
                      exiting={ZoomOut.duration(200).delay(100)}
                    >
                      <CameraSettingsButton
                        name='focus-auto'
                        isEnabled={isAutoFocusEnabled}
                        handleAction={handleEnableAutoFocus}
                      />
                    </Animated.View>
                  )}

                  {/* Bounding box toggle */}
                  <Animated.View
                    layout={Layout.duration(200).delay(200)}
                    entering={
                      isFrontCameraEnabled
                        ? ZoomIn.duration(200).delay(300)
                        : ZoomIn.duration(200).delay(400)
                    }
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
            {!isAutoFocusEnabled && !isFrontCameraEnabled && (
              <Animated.View
                entering={ZoomIn.duration(200)}
                exiting={ZoomOut.duration(200)}
                style={{
                  position: 'absolute',
                  bottom: theme.spacing.sm,
                  left: 0,
                  zIndex: 10,
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: '60%',
                    alignItems: 'center',
                    backgroundColor: theme.colors.baseSecondary['400'],
                    borderWidth: 0.5,
                    borderColor: theme.colors.text['100'],
                    padding: theme.spacing.sm,
                    paddingBottom: 0,
                    borderRadius: 16,
                  }}
                >
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      color: theme.colors.white,
                      fontSize: 10,
                    }}
                  >
                    Focus Depth
                  </Text>
                  <Slider
                    style={{
                      width: '100%',
                      height: 40,
                    }}
                    onValueChange={setFocusDepth}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={theme.colors.text['200']}
                    maximumTrackTintColor={theme.colors.text['200']}
                    thumbTintColor={theme.colors.white}
                  />
                </View>
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
