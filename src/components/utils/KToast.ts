import Toast, { ToastProps } from 'react-native-root-toast';
import { color } from '../../styles/color';

/**
 * DRY Toast wrapper.
 */
export const KToast = {
  success: (msg: string) => Toast.show(msg, { ...baseOptions, ...success }),
  error: (msg: string) => Toast.show(msg, { ...baseOptions, ...error }),
};

const baseOptions: ToastProps = {
  position: Toast.positions.TOP,
  opacity: 1,
  shadowColor: color.basePrimary[500],
  containerStyle: {
    paddingVertical: 32,
    width: '75%',
    marginTop: 32,
  },
};

const success: ToastProps = { backgroundColor: color.green };

const error: ToastProps = { backgroundColor: color.red };
