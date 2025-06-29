import { useState, useEffect } from 'react';
import Modal from '../../components/modal';
import MarketplaceStep from './MarketplaceStep';
import ApiKeyStep from './ApiKeyStep';

const marketplaceNames = {
  wildberries: 'Wildberries',
  ozon: 'Ozon',
  yamarket: 'Я.Маркет',
  avito: 'Авито',
  jivosite: 'Jivosite',
  telegram: 'Telegram',
};

export default function StepManager({
  isOpen,
  onClose,
  onFinish,
  initialStep = 1,
  initialMarketplace = null,
  initialApiKey = '',
}) {
  const [step, setStep] = useState(initialStep);
  const [selectedMarketplace, setSelectedMarketplace] = useState(initialMarketplace);
  const [apiKey, setApiKey] = useState(initialApiKey);

  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
      setSelectedMarketplace(initialMarketplace);
      setApiKey(initialApiKey);
    }
  }, [isOpen, initialStep, initialMarketplace, initialApiKey]);

  const handleComplete = () => {
    const integration = {
      id: selectedMarketplace,
      name: marketplaceNames[selectedMarketplace],
      logo: `/icons/${selectedMarketplace}.webp`,
      apiKey,
    };
    onFinish(integration);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {step === 1 && (
        <MarketplaceStep
          onNext={(marketplaceId) => {
            setSelectedMarketplace(marketplaceId);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <ApiKeyStep
          marketplaceName={marketplaceNames[selectedMarketplace]}
          defaultValue={apiKey}
          onBack={() => setStep(1)}
          onSubmit={(key) => {
            setApiKey(key);
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <div className="max-w-xl mx-auto p-6">
          <h2 className="text-xl font-bold mb-4">Успешно!</h2>
          <p className="text-gray-600 mb-6">
            Интеграция с {marketplaceNames[selectedMarketplace]} обновлена.
          </p>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            onClick={handleComplete}
          >
            Завершить
          </button>
        </div>
      )}
    </Modal>
  );
}
