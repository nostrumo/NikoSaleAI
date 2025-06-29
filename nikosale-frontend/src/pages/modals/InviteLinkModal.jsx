// InviteLinkModal.jsx
import React from 'react';
import Modal from '../../components/modal';
import { Button } from '../../components/button';
import { Copy } from 'lucide-react';


const InviteLinkModal = ({ isOpen, onClose, link }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Ссылка приглашения создана</h2>
        <p className="text-sm text-muted-foreground">
          Отправьте эту ссылку будущему менеджеру. После перехода он сможет присоединиться к вашей команде.
        </p>

        <div className="relative">
          <div className="w-full rounded-md border bg-muted px-4 py-2 pr-12 text-sm text-foreground truncate">
            {link}
          </div>
          <button
            onClick={handleCopy}
            className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-primary transition"
            title="Скопировать"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-4 text-right">
          <Button onClick={onClose}>Понятно</Button>
        </div>
      </div>
    </Modal>
  );
};

export default InviteLinkModal;
