import React from 'react';

/**
 * Basic hook to manage the open and closed state of something.
 * @returns The open state and open state handler.
 */
export const useDisclosure = (): [
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [isOpen, setIsOpen] = React.useState(false);

  return [isOpen, setIsOpen];
};
