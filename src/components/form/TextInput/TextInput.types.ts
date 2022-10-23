import { TextInputProps as RNTextInputProps } from 'react-native';

type TextInputProps = RNTextInputProps & { leftComponent?: JSX.Element };

export default TextInputProps;
