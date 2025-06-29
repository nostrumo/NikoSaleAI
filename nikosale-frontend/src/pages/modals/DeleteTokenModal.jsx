import React from 'react';
import ConfirmModal from './ConfirmModal';

const DeleteTokenModal = ({ isOpen, onClose, onConfirm }) => (
  <ConfirmModal
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    title="Удалить токен?"
    description="Вы уверены, что хотите удалить токен? Это действие необратимо."
    confirmText="Удалить"
    cancelText="Отмена"
  />
);

export default DeleteTokenModal;
