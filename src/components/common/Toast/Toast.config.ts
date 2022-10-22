import RNToast, { ToastProps } from 'react-native-root-toast';

export const baseOptions: ToastProps = {
  position: RNToast.positions.TOP,
  opacity: 1,
  shadowColor: 'black',
  containerStyle: {
    paddingVertical: 32,
    width: '75%',
    marginTop: 32,
  },
};
