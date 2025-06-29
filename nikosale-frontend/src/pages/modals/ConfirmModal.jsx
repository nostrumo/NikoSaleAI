import React from 'react';
import Modal from '../../components/modal';
import { Button } from '../../components/button';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, description, confirmText, cancelText }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            {cancelText || 'Отмена'}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {confirmText || 'Продолжить'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
