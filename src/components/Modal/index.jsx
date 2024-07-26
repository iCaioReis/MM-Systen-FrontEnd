import React, { useState } from 'react';
import { ModalOverlay } from './styles';

export function Modal ({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  const isOpen = isOpen;

  return (
    <ModalOverlay>
        {content}
    </ModalOverlay>
  );
};
