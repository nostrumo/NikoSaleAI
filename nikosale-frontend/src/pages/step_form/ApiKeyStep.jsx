import { useState } from 'react';

export default function ApiKeyStep({ marketplaceName, onBack, onSubmit }) {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = () => {
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-2">Подключение: {marketplaceName}</h2>
      <p className="text-sm text-gray-500 mb-6">
        Введите API-ключ для авторизации аккаунта в {marketplaceName}.
      </p>

      <label className="block mb-4">
        <span className="text-gray-700">API ключ</span>
        <input
          type="text"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Введите ваш API ключ"
        />
      </label>

      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          onClick={onBack}
        >
          Назад
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          disabled={!apiKey.trim()}
          onClick={handleSubmit}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
}
