import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import OutsidePressHandler from 'react-native-outside-press';
import { Color, withOpacity } from '../../styles/Color';
const RNModal = ({ isVisible, setIsVisible, children }) => {
  return (
    <Modal
      backdropColor={Color.black}
      isVisible={isVisible}
      onModalHide={() => setIsVisible(false)}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 16,
        }}
      >
        <OutsidePressHandler
          disabled={false}
          onOutsidePress={() => setIsVisible(false)}
          style={{ width: '100%' }}
        >
          <View
            style={{
              paddingHorizontal: 16,
              width: '100%',
              backgroundColor: Color.base,
              borderWidth: 2,
              borderColor: Color.accent[100],
              borderRadius: 16,
            }}
          >
            {children}
          </View>
        </OutsidePressHandler>
      </View>
    </Modal>
  );
};

export default RNModal;
