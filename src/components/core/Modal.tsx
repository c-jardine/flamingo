import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import OutsidePressHandler from 'react-native-outside-press';
import { ThemeContext } from '../../provider/ThemeProvider';

const RNModal = ({ isVisible, setIsVisible, children }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <Modal
      backdropColor={theme.colors.black}
      isVisible={isVisible}
      onModalHide={() => setIsVisible(false)}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: theme.spacing.md,
        }}
      >
        <OutsidePressHandler
          disabled={false}
          onOutsidePress={() => setIsVisible(false)}
          style={{ width: '100%' }}
        >
          <View
            style={{
              paddingHorizontal: theme.spacing.md,
              width: '100%',
              backgroundColor: theme.colors.background,
              borderWidth: 2,
              borderColor: theme.colors.text['100'],
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
