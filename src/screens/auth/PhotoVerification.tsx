import { Text, View } from 'react-native';
import BackHeader from '../../components/utils/BackHeader';
import { AuthScreensEnum } from '../../enums/AuthScreenEnum';
import { AuthScreenNavigatorProps } from '../../types/auth/AuthScreen';

const PhotoVerification = (props: AuthScreenNavigatorProps) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BackHeader
        handleBack={() => props.navigator(AuthScreensEnum.VERIFY_IDENTITY)}
      />
      <Text style={{ fontSize: 32, color: 'white' }}>Test</Text>
    </View>
  );
};
export default PhotoVerification;
