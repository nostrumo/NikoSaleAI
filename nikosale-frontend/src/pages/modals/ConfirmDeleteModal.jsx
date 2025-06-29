// ConfirmDeleteModal.jsx
import React from 'react';
import Modal from '../../components/modal';
import { Button } from '../../components/button';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, managerName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-destructive">Удалить менеджера?</h2>
        <p className="text-sm text-muted-foreground">
          Вы уверены, что хотите удалить <strong>{managerName}</strong>? Это действие необратимо.
        </p>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Удалить
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
