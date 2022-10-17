import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { Layout, ZoomIn } from 'react-native-reanimated';
import { ThemeContext } from '../../provider/ThemeProvider';

interface CameraActionBarType {
  handleTakePhoto: () => Promise<void>;
  handleRetake: () => void;
  image: CameraCapturedPicture | null;
  onSubmit: () => void;
}

const CameraActionBar = (props: CameraActionBarType) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View style={{ alignItems: 'center', marginTop: theme.spacing.xl }}>
      <Animated.View
      entering={ZoomIn.duration(200)}
        style={{
          width: 256,
          flexDirection: 'row',
          justifyContent: props.image === null ? 'center' : 'space-between',
        }}
      >
        <Animated.View layout={Layout.duration(200)}>
          <TouchableOpacity
            onPress={
              props.image === null ? props.handleTakePhoto : props.handleRetake
            }
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
              width: 64,
              height: 64,
              backgroundColor: theme.colors.white,
            }}
          >
            <MaterialCommunityIcons
              name={props.image === null ? 'camera' : 'reload'}
              size={32}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View layout={Layout.duration(200)}>
          {props.image !== null && (
            <TouchableOpacity
              onPress={props.onSubmit}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 16,
                width: 64,
                height: 64,
                backgroundColor: theme.colors.success,
              }}
            >
              <MaterialCommunityIcons name='check' size={32} />
            </TouchableOpacity>
          )}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default CameraActionBar;
