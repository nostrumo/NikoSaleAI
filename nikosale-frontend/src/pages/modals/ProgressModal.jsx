import React from 'react';
import Modal from '../../components/modal';
import { Loader2 } from 'lucide-react';
const ProgressModal = ({ isOpen, title = 'Подождите...', description = 'Операция выполняется' }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}} maxWidth="max-w-sm" padding="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>

        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full w-2/3 bg-indigo-500 animate-pulse rounded-full" />
        </div>
      </div>
    </Modal>
  );
};

export default ProgressModal;