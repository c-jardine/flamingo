import React, { SetStateAction } from 'react';

type ModalProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

export default ModalProps;
