import RNToast, { ToastProps } from 'react-native-root-toast';
import { color } from '../../../styles/color';
import { baseOptions } from './Toast.config';

/**
 * DRY Toast wrapper.
 */
const Toast = {
  success: (msg: string) => RNToast.show(msg, { ...baseOptions, ...success }),
  error: (msg: string) => RNToast.show(msg, { ...baseOptions, ...error }),
};

const success: ToastProps = { backgroundColor: color.green };

const error: ToastProps = { backgroundColor: color.red };

export default Toast;
