import React from 'react';
import { View } from 'react-native';
import RNModal from 'react-native-modal';
import OutsidePressHandler from 'react-native-outside-press';
import { ThemeContext } from '../../../providers';
import ModalProps from './Modal.types';

const Modal = (props: ModalProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <RNModal
      backdropColor={theme.colors.black}
      isVisible={props.isVisible}
      onModalHide={() => props.setIsVisible(false)}
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
          onOutsidePress={() => props.setIsVisible(false)}
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
            {props.children}
          </View>
        </OutsidePressHandler>
      </View>
    </RNModal>
  );
};

export default Modal;
