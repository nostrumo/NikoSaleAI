import React, {useState, useEffect} from 'react';
import {Badge} from '../components/badge';
import {Button} from '../components/button';
import {Plus} from 'lucide-react';
import {ManagerTable} from '../components/table';
import ConfirmDeleteModal from './modals/ConfirmDeleteModal';
import InviteLinkModal from './modals/InviteLinkModal';

const fetchManagers = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {id: 1, name: 'Иван Петров', email: 'ivan@example.com', role: 'Менеджер'},
                {id: 2, name: 'Ольга Смирнова', email: 'olga@example.com', role: 'Менеджер'},
            ]);
        }, 1000);
    });
};

const Manager = () => {
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({open: false, manager: null});
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [inviteLink, setInviteLink] = useState('');
    const maxManagers = 5;

    useEffect(() => {
        fetchManagers().then((data) => {
            setManagers(data);
            setLoading(false);
        });
    }, []);

    const handleInvite = () => {
        const generated = 'https://example.com/invite/abc123'; // ← Здесь можно вставить генератор ссылки
        setInviteLink(generated);
        setInviteModalOpen(true);
    };

    const handleDelete = (id) => {
        const manager = managers.find((m) => m.id === id);
        setDeleteModal({open: true, manager});
    };

    const confirmDelete = () => {
        if (deleteModal.manager) {
            setManagers((prev) => prev.filter((m) => m.id !== deleteModal.manager.id));
            setDeleteModal({open: false, manager: null});
        }
    };

    return (
        <div className="max-w-2xl py-4 px-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h1 className="text-2xl font-semibold flex items-center gap-2">
                    Менеджеры
                    <Badge variant="outline">
                        {managers.length} из {maxManagers}
                    </Badge>
                </h1>
                <Button
                    onClick={handleInvite}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition"
                >
                    <Plus className="w-4 h-4 shrink-0"/>
                    <span className="leading-none">Пригласить менеджера</span>
                </Button>

            </div>

            <ManagerTable managers={managers} loading={loading} onDelete={handleDelete}/>
            {/* Модалка удаления */}
            <ConfirmDeleteModal
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({open: false, manager: null})}
                onConfirm={confirmDelete}
                managerName={deleteModal.manager?.name}
            />

            {/* Модалка с ссылкой */}
            <InviteLinkModal
                isOpen={inviteModalOpen}
                onClose={() => setInviteModalOpen(false)}
                link={inviteLink}
            />
        </div>
    );
};

export default Manager;
