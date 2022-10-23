import { CameraCapturedPicture } from 'expo-camera';

type CameraActionBarProps = {
  handleTakePhoto: () => Promise<void>;
  handleRetake: () => void;
  image: CameraCapturedPicture | null;
  onSubmit: () => void;
};

export default CameraActionBarProps;
