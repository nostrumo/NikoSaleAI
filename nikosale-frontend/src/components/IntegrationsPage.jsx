import {useState} from 'react';
import Modal from '../components/modal';
import IntegrationCard from './IntegrationCard';
import StepManager from "../pages/step_form/StepManager";
import ozonLogo from '../assets/ozon.svg';
import wbLogo from '../assets/wildberries.svg';
import yaLogo from '../assets/ya_market.svg';
import tgLogo from '../assets/tg.webp';
import jivoLogo from '../assets/jivo.webp';
import avitoLogo from '../assets/avito.webp';

const initialIntegrations = [
    {
        id: 'wildberries',
        name: 'Wildberries',
        apiKey: '••••••••••••',
        logo: wbLogo,
    },
    {
        id: 'ozon',
        name: 'Ozon',
        apiKey: '••••••••••••',
        logo: ozonLogo,
    },
];

export default function IntegrationsPage() {
    const [integrations, setIntegrations] = useState(initialIntegrations);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [apiKey, setApiKey] = useState('');

    const handleSave = () => {
        if (!apiKey) return;

        if (editing) {
            setIntegrations((prev) =>
                prev.map((intg) =>
                    intg.id === editing.id ? {...intg, apiKey} : intg
                )
            );
        } else {
            const newIntegration = {
                id: `id-${Date.now()}`,
                name: 'Новая интеграция',
                logo: '/icons/default.webp',
                apiKey,
            };
            setIntegrations((prev) => [...prev, newIntegration]);
        }

        setApiKey('');
        setEditing(null);
        setShowModal(false);
    };

    const handleDelete = (id) => {
        setIntegrations((prev) => prev.filter((i) => i.id !== id));
    };

    return (
        <div className="max-w-4xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Интеграции</h1>
                <div className="hidden sm:block">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        + Новая интеграция
                    </button>
                </div>
                <div className="sm:hidden fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40">
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-full shadow-md hover:bg-blue-700 transition"
                    >
                        + Новая интеграция
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {integrations.map((integration) => (
                    <IntegrationCard
                        key={integration.id}
                        integration={integration}
                        onEdit={(data) => {
                            setEditing(data);
                            setApiKey(data.apiKey);
                            setShowModal(true);
                        }}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <StepManager
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setEditing(null);
                    }}
                    onFinish={(updatedData) => {
                        if (editing) {
                            // обновление
                            setIntegrations((prev) =>
                                prev.map((item) =>
                                    item.id === editing.id ? {...item, apiKey: updatedData.apiKey} : item
                                )
                            );
                        } else {
                            // добавление
                            setIntegrations((prev) => [...prev, updatedData]);
                        }
                    }}
                    initialStep={editing ? 2 : 1}
                    initialMarketplace={editing?.id}
                    initialApiKey={editing?.apiKey}
                />
            </Modal>
        </div>
    );
}
