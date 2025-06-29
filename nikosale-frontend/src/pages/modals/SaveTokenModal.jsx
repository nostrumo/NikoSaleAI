import React from 'react';
import ConfirmModal from './ConfirmModal';

const SaveTokenModal = ({ isOpen, onClose, onConfirm }) => (
  <ConfirmModal
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    title="Сохранить токен?"
    description="Вы ввели токен, хотите сохранить изменения?"
    confirmText="Сохранить"
    cancelText="Отмена"
  />
);

export default SaveTokenModal;
