import { Backdrop, Modal, Fade, Box } from '@mui/material';
import React from 'react'; // Necesitamos React para 'children'

interface ModalViewProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // <-- 1. Acepta CUALQUIER hijo
}

export const ModalView = ({ isOpen, onClose, children }: ModalViewProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box> 
          {children} 
        </Box>
      </Fade>
    </Modal>
  );
};